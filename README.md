# Shopify Featured Products Section

## Commands to Run the Project Locally

1. Clone or download the project to a local directory:
   ```bash
   cd path/to/your/project
	 ```

2. Install dependencies:
   ```bash
   npm install
	 ```

3. Install Shopify CLI (if not already installed):
   ```bash
   npm install -g @shopify/cli @shopify/theme
	 ```

4. Log in to your Shopify store:
   ```bash
   shopify theme login --store your-store-name.myshopify.com
	 ```

5. Pull the Dawn theme or create a new one:
   ```bash
  shopify theme pull --store your-store-name.myshopify.com
	 ```

6. Build JavaScript and CSS assets:
   ```bash
   npm run build
	 ```

7. Start the local development server:
   ```bash
   shopify theme dev --store your-store-name.myshopify.com
	 ```

8. For automatic asset rebuilding during development:
   ```bash
   npm run watch
	 ```
