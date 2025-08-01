import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Get dashboard analytics
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const analytics = {
      summary: {
        totalInventoryValue: 2850000,
        totalProduction: 156000,
        demandFulfillment: 94.2,
        stockouts: 3,
        lastUpdated: new Date()
      },
      inventoryMetrics: {
        totalItems: 1247,
        lowStockItems: 23,
        overstockItems: 8,
        turnoverRate: 6.8,
        carryingCost: 185000
      },
      productionMetrics: {
        efficiency: 85.5,
        utilizationRate: 78.3,
        qualityScore: 94.3,
        onTimeDelivery: 92.5
      },
      demandMetrics: {
        forecastAccuracy: 89.7,
        growthRate: 8.5,
        seasonalIndex: 1.15,
        marketShare: 23.4
      }
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard analytics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get supply chain performance metrics
router.get('/performance', authenticateToken, async (req, res) => {
  try {
    const performance = {
      overall: {
        score: 87.3,
        trend: 'Improving',
        benchmarkComparison: 'Above Industry Average'
      },
      categories: [
        {
          name: 'Inventory Management',
          score: 89.2,
          metrics: [
            { name: 'Stock Accuracy', value: 97.8, target: 95.0 },
            { name: 'Turnover Rate', value: 6.8, target: 6.0 },
            { name: 'Stockout Rate', value: 1.2, target: 2.0 }
          ]
        },
        {
          name: 'Production Efficiency',
          score: 85.5,
          metrics: [
            { name: 'OEE', value: 85.5, target: 85.0 },
            { name: 'Quality Rate', value: 98.8, target: 98.0 },
            { name: 'On-time Delivery', value: 92.5, target: 95.0 }
          ]
        },
        {
          name: 'Demand Planning',
          score: 87.1,
          metrics: [
            { name: 'Forecast Accuracy', value: 89.7, target: 85.0 },
            { name: 'Bias', value: -2.1, target: 0.0 },
            { name: 'MAD', value: 5.8, target: 8.0 }
          ]
        }
      ]
    };

    res.json({
      success: true,
      data: performance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch performance metrics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
