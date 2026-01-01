# Render Deployment Guide

This guide will help you deploy ProShop v2 to Render.

## Important Note About Image Uploads

⚠️ **Render uses an ephemeral filesystem**, which means uploaded files are stored temporarily and will be **lost when the service restarts**. For production applications, consider using cloud storage like:
- Cloudinary (recommended for images)
- AWS S3
- Google Cloud Storage
- Azure Blob Storage

For now, the current setup will work, but uploaded images will be lost on service restart.

## Prerequisites

1. GitHub repository with your code
2. Render account ([sign up here](https://render.com))
3. MongoDB Atlas account (for database)
4. PayPal Developer account (for payments)

## Step 1: Prepare Your Repository

1. Ensure all changes are committed and pushed to GitHub
2. Make sure `.env` is in `.gitignore` (already done)
3. Verify `package.json` has the build script

## Step 2: Set Up MongoDB Atlas

1. Create a MongoDB Atlas account
2. Create a new cluster (free tier is fine for testing)
3. Create a database user
4. Whitelist Render's IP (0.0.0.0/0 for all IPs - for testing only)
5. Get your connection string (MONGO_URI)

## Step 3: Set Up PayPal

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Create a new app
3. Get your Client ID and Client Secret
4. Note: Use Sandbox for testing, Production for live

## Step 4: Create Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:

### Basic Settings:
- **Name**: `proshop-v2` (or your preferred name)
- **Region**: Choose closest to your users
- **Branch**: `main` (or your main branch)
- **Root Directory**: Leave empty (root)
- **Runtime**: `Node`
- **Build Command**: `npm install && cd frontend && npm install && npm run build && cd ..`
- **Start Command**: `npm start`

### Environment Variables:

Add these environment variables in Render dashboard:

```
NODE_ENV=production
PORT=10000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_random_secret_here
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_ENV=sandbox
```

**Important Notes:**
- Render automatically sets `PORT`, but you can override it
- Use a strong, random string for `JWT_SECRET`
- For production PayPal, set `PAYPAL_ENV=production`
- Make sure MongoDB URI includes your password and database name

### Advanced Settings:

- **Instance Type**: Free tier is fine for testing
- **Auto-Deploy**: Yes (deploys on every push)

## Step 5: Verify Deployment

1. After deployment completes, visit your Render URL
2. Test the application:
   - Register a new user
   - Login
   - Browse products
   - Add products to cart
   - Test checkout (use PayPal sandbox accounts)

## Step 6: Testing Image Uploads

1. Login as admin
2. Go to Product List
3. Edit a product
4. Upload an image
5. Verify the image displays correctly

**Note**: Images will work, but will be lost on service restart due to ephemeral filesystem.

## Troubleshooting

### Images not displaying:
- Check that the uploads directory exists
- Verify `/uploads` route is working: `https://yourapp.onrender.com/uploads/test.jpg`
- Check browser console for 404 errors

### Build fails:
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Database connection issues:
- Verify MongoDB URI is correct
- Check MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Verify database user credentials

### PayPal not working:
- Verify PayPal credentials are correct
- Check `PAYPAL_ENV` matches your credentials (sandbox vs production)
- Test with PayPal sandbox test accounts

## Production Recommendations

1. **Use Cloud Storage for Images**: Implement Cloudinary or AWS S3 for persistent image storage
2. **Use Production PayPal**: Switch to production PayPal credentials
3. **Set up Custom Domain**: Configure a custom domain in Render
4. **Enable HTTPS**: Render provides HTTPS by default
5. **Set up Monitoring**: Use Render's monitoring or integrate external services
6. **Regular Backups**: Ensure MongoDB Atlas backups are enabled

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (Render sets this) | `10000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/proshop` |
| `JWT_SECRET` | Secret for JWT tokens | `your_random_secret_here` |
| `PAYPAL_CLIENT_ID` | PayPal API Client ID | `AbCdEf...` |
| `PAYPAL_CLIENT_SECRET` | PayPal API Client Secret | `XyZ123...` |
| `PAYPAL_ENV` | PayPal environment | `sandbox` or `production` |

## Support

If you encounter issues:
1. Check Render logs in the dashboard
2. Check application logs
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed

