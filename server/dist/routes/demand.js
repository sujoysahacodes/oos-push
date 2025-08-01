"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Get demand forecasts
router.get('/forecasts', auth_1.authenticateToken, async (req, res) => {
    try {
        // Mock demand forecast data
        const forecasts = [
            {
                id: 1,
                productName: 'ABI Premium IPA',
                period: '2025-08',
                forecastedDemand: 45000,
                actualDemand: 0,
                accuracy: null,
                method: 'Time Series',
                confidence: 85.2,
                factors: ['Seasonal', 'Marketing Campaign', 'Weather']
            },
            {
                id: 2,
                productName: 'ABI Classic Lager',
                period: '2025-08',
                forecastedDemand: 78000,
                actualDemand: 0,
                accuracy: null,
                method: 'Machine Learning',
                confidence: 92.1,
                factors: ['Seasonal', 'Economic', 'Competition']
            },
            {
                id: 3,
                productName: 'ABI Premium IPA',
                period: '2025-07',
                forecastedDemand: 42000,
                actualDemand: 43500,
                accuracy: 96.4,
                method: 'Time Series',
                confidence: 87.3,
                factors: ['Seasonal', 'Marketing Campaign']
            }
        ];
        res.json({
            success: true,
            data: forecasts,
            total: forecasts.length
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch demand forecasts',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Get demand trends
router.get('/trends', auth_1.authenticateToken, async (req, res) => {
    try {
        // Mock trend data
        const trends = {
            overall: {
                trend: 'Increasing',
                growthRate: 8.5,
                seasonality: 'Summer Peak'
            },
            byProduct: [
                {
                    productName: 'ABI Premium IPA',
                    trend: 'Increasing',
                    growthRate: 12.3,
                    monthlyData: [
                        { month: '2025-01', demand: 35000 },
                        { month: '2025-02', demand: 38000 },
                        { month: '2025-03', demand: 41000 },
                        { month: '2025-04', demand: 39000 },
                        { month: '2025-05', demand: 42000 },
                        { month: '2025-06', demand: 45000 },
                        { month: '2025-07', demand: 43500 }
                    ]
                },
                {
                    productName: 'ABI Classic Lager',
                    trend: 'Stable',
                    growthRate: 2.1,
                    monthlyData: [
                        { month: '2025-01', demand: 72000 },
                        { month: '2025-02', demand: 74000 },
                        { month: '2025-03', demand: 76000 },
                        { month: '2025-04', demand: 75000 },
                        { month: '2025-05', demand: 77000 },
                        { month: '2025-06', demand: 79000 },
                        { month: '2025-07', demand: 78500 }
                    ]
                }
            ]
        };
        res.json({
            success: true,
            data: trends
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch demand trends',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=demand.js.map