"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Get all inventory items
router.get('/', auth_1.authenticateToken, async (req, res) => {
    try {
        // Mock data for now - replace with database queries
        const inventory = [
            {
                id: 1,
                name: 'Hops - Cascade',
                category: 'Raw Material',
                currentStock: 1500,
                unit: 'kg',
                reorderLevel: 500,
                maxStock: 3000,
                cost: 12.50,
                supplier: 'Pacific Hops Co.',
                location: 'Warehouse A',
                lastUpdated: new Date()
            },
            {
                id: 2,
                name: 'Malt - Pale Ale',
                category: 'Raw Material',
                currentStock: 5000,
                unit: 'kg',
                reorderLevel: 2000,
                maxStock: 10000,
                cost: 2.80,
                supplier: 'Premium Malt Ltd.',
                location: 'Warehouse B',
                lastUpdated: new Date()
            },
            {
                id: 3,
                name: 'IPA - 330ml bottles',
                category: 'Finished Goods',
                currentStock: 25000,
                unit: 'bottles',
                reorderLevel: 10000,
                maxStock: 50000,
                cost: 45.00,
                supplier: 'Internal Production',
                location: 'Cold Storage',
                lastUpdated: new Date()
            }
        ];
        res.json({
            success: true,
            data: inventory,
            total: inventory.length
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch inventory',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Get inventory item by ID
router.get('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        // Mock data - replace with database query
        const item = {
            id: parseInt(id),
            name: 'Hops - Cascade',
            category: 'Raw Material',
            currentStock: 1500,
            unit: 'kg',
            reorderLevel: 500,
            maxStock: 3000,
            cost: 12.50,
            supplier: 'Pacific Hops Co.',
            location: 'Warehouse A',
            lastUpdated: new Date(),
            history: [
                { date: '2025-07-01', type: 'Receipt', quantity: 2000, reference: 'PO-2025-001' },
                { date: '2025-07-15', type: 'Consumption', quantity: -500, reference: 'PROD-2025-010' }
            ]
        };
        res.json({
            success: true,
            data: item
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch inventory item',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Add new inventory item
router.post('/', auth_1.authenticateToken, async (req, res) => {
    try {
        const newItem = req.body;
        // Mock response - replace with database insert
        const savedItem = {
            id: Date.now(),
            ...newItem,
            lastUpdated: new Date()
        };
        res.status(201).json({
            success: true,
            data: savedItem,
            message: 'Inventory item created successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create inventory item',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Update inventory item
router.put('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // Mock response - replace with database update
        const updatedItem = {
            id: parseInt(id),
            ...updateData,
            lastUpdated: new Date()
        };
        res.json({
            success: true,
            data: updatedItem,
            message: 'Inventory item updated successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update inventory item',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Get low stock alerts
router.get('/alerts/low-stock', auth_1.authenticateToken, async (req, res) => {
    try {
        // Mock data - replace with database query
        const lowStockItems = [
            {
                id: 4,
                name: 'Yeast - Ale',
                currentStock: 45,
                reorderLevel: 50,
                unit: 'packs',
                urgency: 'High'
            },
            {
                id: 5,
                name: 'Bottle Caps',
                currentStock: 15000,
                reorderLevel: 20000,
                unit: 'pieces',
                urgency: 'Medium'
            }
        ];
        res.json({
            success: true,
            data: lowStockItems,
            total: lowStockItems.length
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch low stock alerts',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=inventory.js.map