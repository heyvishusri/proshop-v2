import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from '../slices/ordersApiSlice';
import { getImageUrl } from '../utils/imageUtils';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const [paypalError, setPaypalError] = useState(null);

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
      const loadPaypalScript = async () => {
        try {
          paypalDispatch({
            type: 'resetOptions',
            value: {
              'client-id': paypal.clientId,
              currency: 'USD',
              intent: 'capture',
            },
          });
          paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
          setPaypalError(null);
        } catch (err) {
          console.error('PayPal script loading error:', err);
          setPaypalError('Failed to load PayPal. Please refresh the page.');
        }
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    } else if (errorPayPal) {
      setPaypalError('PayPal configuration error. Please contact support.');
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  async function createOrder(data, actions) {
    try {
      if (!order || !order.totalPrice) {
        throw new Error('Order information is missing');
      }

      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: parseFloat(order.totalPrice).toFixed(2),
              currency_code: 'USD',
            },
            description: `Order ${order._id}`,
          },
        ],
      });
    } catch (err) {
      console.error('Create order error:', err);
      toast.error('Failed to create PayPal order. Please try again.');
      throw err;
    }
  }

  async function onApprove(data, actions) {
    try {
      const details = await actions.order.capture();
      
      if (!details || !details.id) {
        throw new Error('Invalid payment response from PayPal');
      }

      // Send payment details to backend
      const paymentData = {
        id: details.id,
        status: details.status,
        update_time: details.update_time,
        payer: {
          email_address: details.payer?.email_address || details.payer?.payer_info?.email,
        },
      };

      await payOrder({ orderId, details: paymentData }).unwrap();
      await refetch();
      toast.success('Payment successful! Your order has been confirmed.');
      setPaypalError(null);
    } catch (err) {
      console.error('Payment error:', err);
      const errorMessage = err?.data?.message || err?.message || 'Payment failed. Please try again.';
      toast.error(errorMessage);
      setPaypalError(errorMessage);
    }
  }

  function onError(err) {
    console.error('PayPal error:', err);
    const errorMessage = err?.message || 'An error occurred with PayPal. Please try again or use a different payment method.';
    toast.error(errorMessage);
    setPaypalError(errorMessage);
  }

  function onCancel(data) {
    console.log('PayPal payment cancelled:', data);
    toast.info('Payment was cancelled. You can try again when ready.');
    setPaypalError(null);
  }

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      await refetch();
      toast.success('Order marked as delivered');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update delivery status');
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error?.error || 'Failed to load order'}</Message>
  ) : (
    <>
      <h1 className='mb-4'>Order {order._id}</h1>
      <Row>
        <Col xs={12} lg={8} className='mb-4'>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`} className='text-decoration-none cursor-pointer transition-colors hover:text-primary'>
                  {order.user.email}
                </a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Paid on {new Date(order.paidAt).toLocaleDateString()}
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col xs={3} sm={2} md={1}>
                          <Image
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            fluid
                            rounded
                            className='w-100'
                            style={{ maxHeight: '60px', objectFit: 'contain' }}
                            onError={(e) => {
                              e.target.src = '/images/sample.jpg';
                            }}
                          />
                        </Col>
                        <Col xs={9} sm={6} md={7}>
                          <Link 
                            to={`/product/${item.product}`} 
                            className='text-decoration-none cursor-pointer transition-colors hover:text-primary'
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col xs={12} sm={4} md={4} className='text-start text-md-end mt-2 mt-sm-0'>
                          {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={12} lg={4}>
          <Card className='shadow-sm border-0' style={{ borderRadius: '8px' }}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 className='mb-0'>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col className='text-end'>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col className='text-end'>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col className='text-end'>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col><strong>Total</strong></Col>
                  <Col className='text-end'><strong>${order.totalPrice}</strong></Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  
                  {paypalError && (
                    <Message variant='danger' className='mb-3'>
                      {paypalError}
                    </Message>
                  )}

                  {errorPayPal && (
                    <Message variant='danger' className='mb-3'>
                      Failed to load PayPal. Please refresh the page.
                    </Message>
                  )}

                  {isPending || loadingPayPal ? (
                    <div className='text-center py-4'>
                      <Loader />
                      <p className='mt-2 text-muted'>Loading PayPal...</p>
                    </div>
                  ) : paypal?.clientId ? (
                    <div className='paypal-button-container'>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                        onCancel={onCancel}
                        style={{
                          layout: 'vertical',
                          color: 'blue',
                          shape: 'rect',
                          label: 'paypal',
                        }}
                      />
                    </div>
                  ) : (
                    <Message variant='warning'>
                      PayPal is not configured. Please contact support.
                    </Message>
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='w-100 cursor-pointer transition-all hover:opacity-90'
                      onClick={deliverHandler}
                      style={{ borderRadius: '6px' }}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;