"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Create new OOS ticket (Unified Digital Intake)
router.post('/tickets', auth_1.authenticateToken, async (req, res) => {
    try {
        const ticketData = req.body;
        // Mock AI triage processing
        const processedTicket = {
            id: `OOS-${Date.now()}`,
            originalRequest: ticketData.description || ticketData.message,
            wholesalerId: ticketData.wholesalerId,
            wholesalerName: ticketData.wholesalerName,
            // AI-parsed structured data
            parsedSKU: extractSKU(ticketData.description || ticketData.message),
            parsedQuantity: extractQuantity(ticketData.description || ticketData.message),
            parsedUrgency: extractUrgency(ticketData.description || ticketData.message),
            status: 'AI_Triage_Complete',
            channel: ticketData.channel || 'portal', // 'portal' or 'hotline'
            priority: determinePriority(ticketData),
            createdAt: new Date(),
            updatedAt: new Date(),
            timeline: [
                {
                    timestamp: new Date(),
                    action: 'Ticket Created',
                    details: 'OOS request received and processed by AI triage',
                    actor: 'AI_Copilot'
                }
            ]
        };
        // Trigger automated inventory validation
        const validationResult = await performInventoryValidation(processedTicket);
        processedTicket.validationResult = validationResult;
        processedTicket.status = 'Inventory_Validated';
        processedTicket.timeline.push({
            timestamp: new Date(),
            action: 'Inventory Validated',
            details: validationResult.requiresAction ? 'Stockout risk confirmed' : 'No action needed - adequate inventory',
            actor: 'AI_Copilot'
        });
        // If validation shows action is needed, trigger resolution planning
        if (validationResult.requiresAction) {
            const resolutionPlan = await generateResolutionPlan(processedTicket);
            processedTicket.resolutionPlan = resolutionPlan;
            processedTicket.status = 'Resolution_Planned';
            processedTicket.timeline.push({
                timestamp: new Date(),
                action: 'Resolution Planned',
                details: `Solution found: ${resolutionPlan.description}`,
                actor: 'AI_Copilot'
            });
        }
        res.status(201).json({
            success: true,
            data: processedTicket,
            message: 'OOS ticket created and processed by AI Copilot'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create OOS ticket',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Get all OOS tickets with filters
router.get('/tickets', auth_1.authenticateToken, async (req, res) => {
    try {
        const { status, priority, wholesaler, startDate, endDate } = req.query;
        // Mock ticket data
        const tickets = [
            {
                id: 'OOS-001',
                originalRequest: 'Need 10 more pallets of Budweiser ASAP',
                wholesalerId: 'WH001',
                wholesalerName: 'Metro Beer Distributors',
                parsedSKU: 'BUD-12OZ-24PK',
                parsedQuantity: 240, // 10 pallets * 24 cases
                parsedUrgency: 'High',
                status: 'Resolved',
                channel: 'hotline',
                priority: 'High',
                createdAt: new Date('2025-07-30T10:30:00Z'),
                resolvedAt: new Date('2025-07-30T10:45:00Z'),
                resolutionTime: 15, // minutes
                resolutionPlan: {
                    type: 'Augment_Existing_Shipment',
                    description: 'Added 240 cases to existing shipment TRK-456',
                    cost: 0,
                    deliveryETA: '2025-07-31T14:00:00Z'
                }
            },
            {
                id: 'OOS-002',
                originalRequest: 'Running low on Stella Artois, about 3 days left',
                wholesalerId: 'WH002',
                wholesalerName: 'City Wide Beverages',
                parsedSKU: 'STELLA-12OZ-24PK',
                parsedQuantity: 120,
                parsedUrgency: 'Medium',
                status: 'In_Progress',
                channel: 'portal',
                priority: 'Medium',
                createdAt: new Date('2025-08-01T08:15:00Z'),
                resolutionPlan: {
                    type: 'Emergency_Shipment',
                    description: 'Dispatch from Denver DC arriving in 2 days',
                    cost: 450,
                    deliveryETA: '2025-08-03T12:00:00Z'
                }
            }
        ];
        // Apply filters (mock implementation)
        let filteredTickets = tickets;
        if (status) {
            filteredTickets = filteredTickets.filter(t => t.status === status);
        }
        if (priority) {
            filteredTickets = filteredTickets.filter(t => t.priority === priority);
        }
        res.json({
            success: true,
            data: filteredTickets,
            total: filteredTickets.length,
            summary: {
                total: tickets.length,
                byStatus: {
                    resolved: tickets.filter(t => t.status === 'Resolved').length,
                    inProgress: tickets.filter(t => t.status === 'In_Progress').length,
                    escalated: tickets.filter(t => t.status === 'Escalated').length
                },
                averageResolutionTime: 22 // minutes
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch OOS tickets',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Get specific ticket details
router.get('/tickets/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        // Mock detailed ticket data
        const ticket = {
            id: id,
            originalRequest: 'Need 10 more pallets of Budweiser ASAP',
            wholesalerId: 'WH001',
            wholesalerName: 'Metro Beer Distributors',
            wholesalerContact: {
                name: 'John Smith',
                phone: '+1-555-0123',
                email: 'john.smith@metrobeer.com'
            },
            parsedSKU: 'BUD-12OZ-24PK',
            parsedQuantity: 240,
            parsedUrgency: 'High',
            status: 'Resolved',
            channel: 'hotline',
            priority: 'High',
            // Inventory validation details
            validationResult: {
                currentInventory: 48, // cases
                daysOfCover: 1.2,
                incomingShipments: [
                    { id: 'TRK-456', quantity: 120, eta: '2025-07-31T14:00:00Z' }
                ],
                requiresAction: true,
                reason: 'Inventory will run out before next scheduled shipment'
            },
            // Resolution plan
            resolutionPlan: {
                type: 'Augment_Existing_Shipment',
                description: 'Added 240 cases to existing shipment TRK-456',
                actions: [
                    'Updated shipment TRK-456 in SSM system',
                    'Allocated inventory from Chicago brewery',
                    'Confirmed truck capacity available'
                ],
                cost: 0,
                deliveryETA: '2025-07-31T14:00:00Z',
                alternatives: [
                    {
                        type: 'Emergency_Shipment',
                        description: 'Dedicated truck from Milwaukee brewery',
                        cost: 850,
                        eta: '2025-07-30T18:00:00Z'
                    }
                ]
            },
            // Communication log
            communications: [
                {
                    timestamp: '2025-07-30T10:30:00Z',
                    type: 'Received',
                    channel: 'hotline',
                    message: 'Initial OOS request received via hotline call'
                },
                {
                    timestamp: '2025-07-30T10:32:00Z',
                    type: 'Sent',
                    channel: 'email',
                    message: 'AI processing confirmation: "Your request is being analyzed..."'
                },
                {
                    timestamp: '2025-07-30T10:45:00Z',
                    type: 'Sent',
                    channel: 'email',
                    message: 'Resolution confirmed: "240 cases added to TRK-456, arriving tomorrow 2 PM"'
                }
            ],
            // Timeline
            timeline: [
                {
                    timestamp: '2025-07-30T10:30:00Z',
                    action: 'Ticket Created',
                    details: 'OOS request received via hotline',
                    actor: 'System'
                },
                {
                    timestamp: '2025-07-30T10:31:00Z',
                    action: 'AI Triage Complete',
                    details: 'Parsed: BUD-12OZ-24PK, 240 cases, High urgency',
                    actor: 'AI_Copilot'
                },
                {
                    timestamp: '2025-07-30T10:42:00Z',
                    action: 'Inventory Validated',
                    details: 'Confirmed stockout risk - action required',
                    actor: 'AI_Copilot'
                },
                {
                    timestamp: '2025-07-30T10:44:00Z',
                    action: 'Resolution Planned',
                    details: 'Optimal solution: Augment existing shipment',
                    actor: 'AI_Copilot'
                },
                {
                    timestamp: '2025-07-30T10:45:00Z',
                    action: 'Executed',
                    details: 'Updated SSM system, wholesaler notified',
                    actor: 'AI_Copilot'
                },
                {
                    timestamp: '2025-07-31T14:15:00Z',
                    action: 'Delivery Confirmed',
                    details: 'Shipment TRK-456 delivered successfully',
                    actor: 'System'
                }
            ],
            createdAt: new Date('2025-07-30T10:30:00Z'),
            resolvedAt: new Date('2025-07-31T14:15:00Z'),
            resolutionTime: 15 // minutes to plan, 27.75 hours to deliver
        };
        res.json({
            success: true,
            data: ticket
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch ticket details',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Execute resolution plan
router.post('/tickets/:id/execute', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { approved } = req.body;
        if (!approved) {
            return res.status(400).json({
                success: false,
                message: 'Resolution plan must be approved before execution'
            });
        }
        // Mock execution process
        const executionResult = {
            ticketId: id,
            executed: true,
            timestamp: new Date(),
            actions: [
                'Updated SSM system with additional 240 cases',
                'Confirmed truck capacity on TRK-456',
                'Sent notification to wholesaler',
                'Created monitoring alert for delivery confirmation'
            ],
            systemUpdates: {
                ssm: { orderId: 'ORD-789', updated: true },
                serviceNow: { ticketStatus: 'In_Progress', updated: true }
            }
        };
        res.json({
            success: true,
            data: executionResult,
            message: 'Resolution plan executed successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to execute resolution plan',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Escalate ticket to human coordinator
router.post('/tickets/:id/escalate', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { reason, analysis } = req.body;
        const escalation = {
            ticketId: id,
            escalatedAt: new Date(),
            reason: reason,
            aiAnalysis: analysis,
            assignedTo: 'coordinator@abi.com',
            status: 'Escalated',
            priority: 'High'
        };
        res.json({
            success: true,
            data: escalation,
            message: 'Ticket escalated to human coordinator'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to escalate ticket',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Helper functions for AI processing (mock implementations)
function extractSKU(text) {
    // Mock NLP parsing - in real implementation, use actual NLP
    const skuPatterns = {
        'budweiser': 'BUD-12OZ-24PK',
        'stella artois': 'STELLA-12OZ-24PK',
        'corona': 'CORONA-12OZ-24PK',
        'michelob ultra': 'MICH-ULTRA-12OZ-24PK'
    };
    const lowerText = text.toLowerCase();
    for (const [keyword, sku] of Object.entries(skuPatterns)) {
        if (lowerText.includes(keyword)) {
            return sku;
        }
    }
    return 'UNKNOWN-SKU';
}
function extractQuantity(text) {
    // Mock quantity extraction
    const palletMatch = text.match(/(\d+)\s*pallets?/i);
    if (palletMatch) {
        return parseInt(palletMatch[1]) * 24; // assuming 24 cases per pallet
    }
    const caseMatch = text.match(/(\d+)\s*cases?/i);
    if (caseMatch) {
        return parseInt(caseMatch[1]);
    }
    return 0;
}
function extractUrgency(text) {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('asap') || lowerText.includes('urgent') || lowerText.includes('emergency')) {
        return 'High';
    }
    if (lowerText.includes('soon') || lowerText.includes('quickly')) {
        return 'Medium';
    }
    return 'Low';
}
function determinePriority(ticketData) {
    if (ticketData.channel === 'hotline')
        return 'High';
    if (ticketData.urgency === 'High')
        return 'High';
    return 'Medium';
}
async function performInventoryValidation(ticket) {
    // Mock inventory validation - in real implementation, query actual systems
    return {
        currentInventory: Math.floor(Math.random() * 100),
        daysOfCover: Math.random() * 5,
        incomingShipments: [
            { id: 'TRK-' + Math.floor(Math.random() * 1000), quantity: 120, eta: new Date() }
        ],
        requiresAction: Math.random() > 0.3, // 70% require action
        reason: 'Inventory will run out before next scheduled shipment'
    };
}
async function generateResolutionPlan(ticket) {
    // Mock resolution planning - in real implementation, use optimization algorithms
    const plans = [
        {
            type: 'Augment_Existing_Shipment',
            description: 'Add quantity to existing shipment',
            cost: 0,
            deliveryETA: new Date(Date.now() + 24 * 60 * 60 * 1000) // +1 day
        },
        {
            type: 'Emergency_Shipment',
            description: 'Dispatch dedicated truck',
            cost: Math.floor(Math.random() * 1000),
            deliveryETA: new Date(Date.now() + 12 * 60 * 60 * 1000) // +12 hours
        }
    ];
    return plans[Math.floor(Math.random() * plans.length)];
}
exports.default = router;
//# sourceMappingURL=oos.js.map