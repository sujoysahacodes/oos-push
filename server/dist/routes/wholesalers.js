"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Get all wholesalers
router.get('/', auth_1.authenticateToken, async (req, res) => {
    try {
        // Mock wholesaler data
        const wholesalers = [
            {
                id: 'WH001',
                name: 'Metro Beer Distributors',
                location: {
                    address: '123 Industrial Blvd',
                    city: 'Chicago',
                    state: 'IL',
                    zipCode: '60601'
                },
                contact: {
                    name: 'John Smith',
                    phone: '+1-555-0123',
                    email: 'john.smith@metrobeer.com'
                },
                servingRadius: 50,
                totalSKUs: 45,
                averageDaysOfCover: 8.5,
                riskSKUs: 3
            },
            {
                id: 'WH002',
                name: 'City Wide Beverages',
                location: {
                    address: '456 Commerce St',
                    city: 'Denver',
                    state: 'CO',
                    zipCode: '80202'
                },
                contact: {
                    name: 'Sarah Johnson',
                    phone: '+1-555-0456',
                    email: 'sarah.johnson@citywide.com'
                },
                servingRadius: 75,
                totalSKUs: 38,
                averageDaysOfCover: 6.2,
                riskSKUs: 7
            }
        ];
        res.json({
            success: true,
            data: wholesalers,
            total: wholesalers.length
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch wholesalers',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Get wholesaler inventory details
router.get('/:id/inventory', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        // Mock inventory data for wholesaler
        const inventory = [
            {
                sku: 'BUD-12OZ-24PK',
                productName: 'Budweiser 12oz 24-pack',
                currentStock: 48,
                unit: 'cases',
                daysOfCover: 1.2,
                reorderLevel: 120,
                status: 'Critical',
                lastUpdated: new Date('2025-08-01T08:00:00Z'),
                incomingShipments: [
                    { id: 'TRK-456', quantity: 120, eta: '2025-08-02T14:00:00Z' }
                ]
            },
            {
                sku: 'STELLA-12OZ-24PK',
                productName: 'Stella Artois 12oz 24-pack',
                currentStock: 156,
                unit: 'cases',
                daysOfCover: 3.2,
                reorderLevel: 100,
                status: 'Low',
                lastUpdated: new Date('2025-08-01T08:00:00Z'),
                incomingShipments: []
            },
            {
                sku: 'CORONA-12OZ-24PK',
                productName: 'Corona Extra 12oz 24-pack',
                currentStock: 280,
                unit: 'cases',
                daysOfCover: 7.5,
                reorderLevel: 150,
                status: 'Good',
                lastUpdated: new Date('2025-08-01T08:00:00Z'),
                incomingShipments: [
                    { id: 'TRK-789', quantity: 200, eta: '2025-08-05T10:00:00Z' }
                ]
            }
        ];
        const summary = {
            totalSKUs: inventory.length,
            totalValue: inventory.reduce((sum, item) => sum + (item.currentStock * 45), 0), // assuming $45 per case
            criticalSKUs: inventory.filter(item => item.status === 'Critical').length,
            lowSKUs: inventory.filter(item => item.status === 'Low').length,
            averageDaysOfCover: inventory.reduce((sum, item) => sum + item.daysOfCover, 0) / inventory.length
        };
        res.json({
            success: true,
            data: {
                wholesalerId: id,
                summary,
                inventory
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch wholesaler inventory',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Get wholesaler's OOS ticket history
router.get('/:id/tickets', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        // Mock ticket history
        const tickets = [
            {
                id: 'OOS-001',
                parsedSKU: 'BUD-12OZ-24PK',
                parsedQuantity: 240,
                status: 'Resolved',
                priority: 'High',
                createdAt: '2025-07-30T10:30:00Z',
                resolvedAt: '2025-07-31T14:15:00Z',
                resolutionTime: 15
            },
            {
                id: 'OOS-002',
                parsedSKU: 'STELLA-12OZ-24PK',
                parsedQuantity: 120,
                status: 'In_Progress',
                priority: 'Medium',
                createdAt: '2025-08-01T08:15:00Z',
                resolutionTime: null
            }
        ];
        res.json({
            success: true,
            data: tickets,
            total: tickets.length
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch wholesaler tickets',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=wholesalers.js.map