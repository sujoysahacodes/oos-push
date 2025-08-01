import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Get all SKUs in the system
router.get('/', authenticateToken, async (req, res) => {
  try {
    const skus = [
      {
        sku: 'BUD-12OZ-24PK',
        productName: 'Budweiser',
        brand: 'Budweiser',
        packageSize: '12oz',
        packageType: '24-pack',
        unitsPerCase: 24,
        casesPerPallet: 24,
        category: 'Lager',
        abv: 5.0,
        active: true
      },
      {
        sku: 'STELLA-12OZ-24PK',
        productName: 'Stella Artois',
        brand: 'Stella Artois',
        packageSize: '12oz',
        packageType: '24-pack',
        unitsPerCase: 24,
        casesPerPallet: 24,
        category: 'Pilsner',
        abv: 5.2,
        active: true
      },
      {
        sku: 'CORONA-12OZ-24PK',
        productName: 'Corona Extra',
        brand: 'Corona',
        packageSize: '12oz',
        packageType: '24-pack',
        unitsPerCase: 24,
        casesPerPallet: 24,
        category: 'Lager',
        abv: 4.6,
        active: true
      },
      {
        sku: 'MICH-ULTRA-12OZ-24PK',
        productName: 'Michelob Ultra',
        brand: 'Michelob',
        packageSize: '12oz',
        packageType: '24-pack',
        unitsPerCase: 24,
        casesPerPallet: 24,
        category: 'Light Lager',
        abv: 4.2,
        active: true
      }
    ];

    res.json({
      success: true,
      data: skus,
      total: skus.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch SKUs',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Search SKUs (for AI parsing assistance)
router.get('/search', authenticateToken, async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    // Mock search logic
    const allSKUs = [
      { sku: 'BUD-12OZ-24PK', productName: 'Budweiser', brand: 'Budweiser', keywords: ['budweiser', 'bud'] },
      { sku: 'STELLA-12OZ-24PK', productName: 'Stella Artois', brand: 'Stella Artois', keywords: ['stella', 'stella artois'] },
      { sku: 'CORONA-12OZ-24PK', productName: 'Corona Extra', brand: 'Corona', keywords: ['corona', 'corona extra'] },
      { sku: 'MICH-ULTRA-12OZ-24PK', productName: 'Michelob Ultra', brand: 'Michelob', keywords: ['michelob', 'ultra', 'mich ultra'] }
    ];

    const searchTerm = (q as string).toLowerCase();
    const matches = allSKUs.filter(sku => 
      sku.keywords.some(keyword => keyword.includes(searchTerm)) ||
      sku.productName.toLowerCase().includes(searchTerm) ||
      sku.brand.toLowerCase().includes(searchTerm)
    );

    res.json({
      success: true,
      data: matches,
      total: matches.length,
      searchTerm: q
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to search SKUs',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get SKU details with availability across wholesalers
router.get('/:sku/availability', authenticateToken, async (req, res) => {
  try {
    const { sku } = req.params;
    
    // Mock availability data
    const availability = {
      sku: sku,
      productName: 'Budweiser 12oz 24-pack',
      totalInventory: 2856,
      totalWholesalers: 15,
      averageDaysOfCover: 5.8,
      wholesalerBreakdown: [
        {
          wholesalerId: 'WH001',
          wholesalerName: 'Metro Beer Distributors',
          currentStock: 48,
          daysOfCover: 1.2,
          status: 'Critical',
          lastOOSTicket: '2025-07-30T10:30:00Z'
        },
        {
          wholesalerId: 'WH002',
          wholesalerName: 'City Wide Beverages',
          currentStock: 285,
          daysOfCover: 7.8,
          status: 'Good',
          lastOOSTicket: null
        }
      ],
      riskAnalysis: {
        totalAtRisk: 3,
        criticalRisk: 1,
        mediumRisk: 2,
        predictedOOSIn48Hours: 1
      }
    };

    res.json({
      success: true,
      data: availability
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch SKU availability',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
