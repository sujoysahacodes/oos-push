"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Get production schedules
router.get('/schedules', auth_1.authenticateToken, async (req, res) => {
    try {
        // Mock data for production schedules
        const schedules = [
            {
                id: 1,
                productName: 'ABI Premium IPA',
                batchNumber: 'IPA-2025-015',
                plannedStartDate: '2025-08-05',
                plannedEndDate: '2025-08-12',
                plannedQuantity: 5000,
                actualQuantity: 0,
                status: 'Planned',
                brewery: 'Mumbai Brewery',
                equipment: 'Fermenter Tank 3',
                rawMaterials: [
                    { name: 'Pale Malt', required: 800, allocated: 800 },
                    { name: 'Cascade Hops', required: 25, allocated: 25 },
                    { name: 'Ale Yeast', required: 5, allocated: 5 }
                ]
            },
            {
                id: 2,
                productName: 'ABI Classic Lager',
                batchNumber: 'LAG-2025-023',
                plannedStartDate: '2025-08-03',
                plannedEndDate: '2025-08-10',
                plannedQuantity: 8000,
                actualQuantity: 8000,
                status: 'Completed',
                brewery: 'Delhi Brewery',
                equipment: 'Fermenter Tank 1',
                rawMaterials: [
                    { name: 'Pilsner Malt', required: 1200, allocated: 1200 },
                    { name: 'Saaz Hops', required: 18, allocated: 18 },
                    { name: 'Lager Yeast', required: 8, allocated: 8 }
                ]
            }
        ];
        res.json({
            success: true,
            data: schedules,
            total: schedules.length
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch production schedules',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Create new production schedule
router.post('/schedules', auth_1.authenticateToken, async (req, res) => {
    try {
        const scheduleData = req.body;
        // Mock response - replace with database insert
        const newSchedule = {
            id: Date.now(),
            ...scheduleData,
            status: 'Planned',
            actualQuantity: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        res.status(201).json({
            success: true,
            data: newSchedule,
            message: 'Production schedule created successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create production schedule',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Get production capacity utilization
router.get('/capacity', auth_1.authenticateToken, async (req, res) => {
    try {
        // Mock capacity data
        const capacityData = [
            {
                brewery: 'Mumbai Brewery',
                totalCapacity: 50000,
                utilizedCapacity: 38000,
                utilizationRate: 76,
                availableCapacity: 12000,
                equipment: [
                    { name: 'Fermenter Tank 1', capacity: 10000, utilized: 10000, status: 'Full' },
                    { name: 'Fermenter Tank 2', capacity: 10000, utilized: 8000, status: 'Partial' },
                    { name: 'Fermenter Tank 3', capacity: 10000, utilized: 10000, status: 'Full' },
                    { name: 'Fermenter Tank 4', capacity: 10000, utilized: 10000, status: 'Full' },
                    { name: 'Fermenter Tank 5', capacity: 10000, utilized: 0, status: 'Available' }
                ]
            },
            {
                brewery: 'Delhi Brewery',
                totalCapacity: 60000,
                utilizedCapacity: 42000,
                utilizationRate: 70,
                availableCapacity: 18000,
                equipment: [
                    { name: 'Fermenter Tank 1', capacity: 12000, utilized: 12000, status: 'Full' },
                    { name: 'Fermenter Tank 2', capacity: 12000, utilized: 12000, status: 'Full' },
                    { name: 'Fermenter Tank 3', capacity: 12000, utilized: 12000, status: 'Full' },
                    { name: 'Fermenter Tank 4', capacity: 12000, utilized: 6000, status: 'Partial' },
                    { name: 'Fermenter Tank 5', capacity: 12000, utilized: 0, status: 'Available' }
                ]
            }
        ];
        res.json({
            success: true,
            data: capacityData
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch capacity data',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Get production KPIs
router.get('/kpis', auth_1.authenticateToken, async (req, res) => {
    try {
        // Mock KPI data
        const kpis = {
            efficiency: {
                overall: 85.5,
                byBrewery: [
                    { name: 'Mumbai Brewery', efficiency: 87.2 },
                    { name: 'Delhi Brewery', efficiency: 83.8 },
                    { name: 'Bangalore Brewery', efficiency: 86.1 }
                ]
            },
            quality: {
                defectRate: 1.2,
                qualityScore: 94.3,
                batchesRejected: 3,
                totalBatches: 247
            },
            productivity: {
                plannedVsActual: 96.8,
                onTimeDelivery: 92.5,
                equipmentUtilization: 78.3
            },
            costs: {
                costPerUnit: 28.45,
                materialCostRatio: 62.3,
                laborCostRatio: 18.7,
                overheadCostRatio: 19.0
            }
        };
        res.json({
            success: true,
            data: kpis
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch production KPIs',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=production.js.map