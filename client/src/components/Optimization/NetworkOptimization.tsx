import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  Chip,
  Divider,
  Alert,
  AlertTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  TrendingUp as OptimizeIcon,
  LocalShipping as ShippingIcon,
  AccountBalance as CostIcon,
  AccessTime as TimeIcon,
  Warning as RiskIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Refresh as RecalculateIcon
} from '@mui/icons-material';

interface OptimizationScenario {
  id: string;
  name: string;
  description: string;
  costs: {
    total: number;
    inventory: number;
    transportation: number;
    handling: number;
    opportunity: number;
  };
  metrics: {
    deliveryTime: number; // hours
    riskScore: number; // 1-10
    serviceLevel: number; // percentage
    efficiency: number; // percentage
  };
  actions: OptimizationAction[];
  recommendation: 'Highly Recommended' | 'Recommended' | 'Alternative' | 'Not Recommended';
  pros: string[];
  cons: string[];
}

interface OptimizationAction {
  id: string;
  type: 'Shipment' | 'Inventory_Transfer' | 'Emergency_Order' | 'Route_Change';
  description: string;
  fromLocation: string;
  toLocation: string;
  quantity: number;
  sku: string;
  estimatedCost: number;
  estimatedTime: number; // hours
  priority: 'High' | 'Medium' | 'Low';
}

interface CostBreakdown {
  component: string;
  amount: number;
  percentage: number;
  description: string;
}

const NetworkOptimization: React.FC = () => {
  const [scenarios, setScenarios] = useState<OptimizationScenario[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<OptimizationScenario | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationComplete, setOptimizationComplete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [decisionMade, setDecisionMade] = useState<string | null>(null);

  useEffect(() => {
    loadOptimizationScenarios();
  }, []);

  const loadOptimizationScenarios = () => {
    // Mock optimization scenarios
    const mockScenarios: OptimizationScenario[] = [
      {
        id: 'OPT001',
        name: 'Express Direct Shipment',
        description: 'Direct shipment from Chicago DC to Metro Beverage Distributors',
        costs: {
          total: 2850,
          inventory: 450,
          transportation: 1200,
          handling: 800,
          opportunity: 400
        },
        metrics: {
          deliveryTime: 18,
          riskScore: 2,
          serviceLevel: 98,
          efficiency: 85
        },
        actions: [
          {
            id: 'ACT001',
            type: 'Shipment',
            description: 'Direct shipment of 72 cases Budweiser 12oz',
            fromLocation: 'Chicago Distribution Center',
            toLocation: 'Metro Beverage Distributors',
            quantity: 72,
            sku: 'BUD-12OZ-24',
            estimatedCost: 1200,
            estimatedTime: 18,
            priority: 'High'
          }
        ],
        recommendation: 'Highly Recommended',
        pros: [
          'Fastest delivery time (18 hours)',
          'Highest service level (98%)',
          'Low risk of delays',
          'Direct route minimizes handling'
        ],
        cons: [
          'Higher transportation cost',
          'Limited capacity for other orders',
          'Premium freight rates'
        ]
      },
      {
        id: 'OPT002',
        name: 'Consolidated Multi-Stop Route',
        description: 'Consolidated shipment with scheduled route optimization',
        costs: {
          total: 2200,
          inventory: 500,
          transportation: 800,
          handling: 600,
          opportunity: 300
        },
        metrics: {
          deliveryTime: 36,
          riskScore: 4,
          serviceLevel: 92,
          efficiency: 95
        },
        actions: [
          {
            id: 'ACT002',
            type: 'Route_Change',
            description: 'Add stop to existing route from Chicago',
            fromLocation: 'Chicago Distribution Center',
            toLocation: 'Metro Beverage Distributors',
            quantity: 72,
            sku: 'BUD-12OZ-24',
            estimatedCost: 800,
            estimatedTime: 36,
            priority: 'Medium'
          }
        ],
        recommendation: 'Recommended',
        pros: [
          'Most cost-effective option',
          'High operational efficiency (95%)',
          'Better resource utilization',
          'Lower environmental impact'
        ],
        cons: [
          'Longer delivery time (36 hours)',
          'Dependent on other deliveries',
          'Medium risk of delays'
        ]
      },
      {
        id: 'OPT003',
        name: 'Cross-Dock Transfer',
        description: 'Transfer from Atlanta hub via cross-dock facility',
        costs: {
          total: 3100,
          inventory: 600,
          transportation: 1400,
          handling: 900,
          opportunity: 200
        },
        metrics: {
          deliveryTime: 48,
          riskScore: 6,
          serviceLevel: 88,
          efficiency: 78
        },
        actions: [
          {
            id: 'ACT003A',
            type: 'Inventory_Transfer',
            description: 'Transfer inventory from Atlanta to cross-dock',
            fromLocation: 'Atlanta Regional Hub',
            toLocation: 'Memphis Cross-Dock',
            quantity: 72,
            sku: 'BUD-12OZ-24',
            estimatedCost: 700,
            estimatedTime: 24,
            priority: 'Medium'
          },
          {
            id: 'ACT003B',
            type: 'Shipment',
            description: 'Final delivery to wholesaler',
            fromLocation: 'Memphis Cross-Dock',
            toLocation: 'Metro Beverage Distributors',
            quantity: 72,
            sku: 'BUD-12OZ-24',
            estimatedCost: 700,
            estimatedTime: 24,
            priority: 'Medium'
          }
        ],
        recommendation: 'Alternative',
        pros: [
          'Utilizes available Atlanta inventory',
          'Lower opportunity cost',
          'Backup option availability'
        ],
        cons: [
          'Highest total cost',
          'Longest delivery time (48 hours)',
          'Multiple handling points increase risk',
          'Lower efficiency rating'
        ]
      }
    ];

    setScenarios(mockScenarios);
    setSelectedScenario(mockScenarios[0]); // Default to first scenario
  };

  const runOptimization = async () => {
    setIsOptimizing(true);
    setOptimizationComplete(false);
    setDecisionMade(null);

    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsOptimizing(false);
    setOptimizationComplete(true);
  };

  const handleDecision = (decision: 'approve' | 'reject' | 'modify') => {
    setDecisionMade(decision);
    
    if (decision === 'approve' && selectedScenario) {
      // Here you would implement the actual execution
      console.log(`Approved scenario: ${selectedScenario.name}`);
    }
  };

  const getCostBreakdown = (scenario: OptimizationScenario): CostBreakdown[] => {
    const total = scenario.costs.total;
    return [
      {
        component: 'Transportation',
        amount: scenario.costs.transportation,
        percentage: Math.round((scenario.costs.transportation / total) * 100),
        description: 'Fuel, driver costs, vehicle depreciation'
      },
      {
        component: 'Handling',
        amount: scenario.costs.handling,
        percentage: Math.round((scenario.costs.handling / total) * 100),
        description: 'Loading, unloading, warehouse operations'
      },
      {
        component: 'Inventory Holding',
        amount: scenario.costs.inventory,
        percentage: Math.round((scenario.costs.inventory / total) * 100),
        description: 'Storage, insurance, depreciation'
      },
      {
        component: 'Opportunity Cost',
        amount: scenario.costs.opportunity,
        percentage: Math.round((scenario.costs.opportunity / total) * 100),
        description: 'Lost sales, customer satisfaction impact'
      }
    ];
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Highly Recommended': return 'success';
      case 'Recommended': return 'primary';
      case 'Alternative': return 'warning';
      case 'Not Recommended': return 'error';
      default: return 'default';
    }
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore <= 3) return 'success';
    if (riskScore <= 6) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Network Optimization Engine
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        AI-powered optimization with cost analysis and actionable recommendations
      </Typography>

      {/* Control Panel */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Optimization Parameters
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current optimization: Budweiser 12oz shortage at Metro Beverage Distributors
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<OptimizeIcon />}
              onClick={runOptimization}
              disabled={isOptimizing}
              sx={{ mr: 2 }}
            >
              {isOptimizing ? 'Optimizing...' : 'Run Optimization'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<RecalculateIcon />}
              onClick={() => loadOptimizationScenarios()}
            >
              Recalculate
            </Button>
          </Grid>
        </Grid>

        {isOptimizing && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              Analyzing network topology, cost factors, and constraints...
            </Typography>
            <LinearProgress />
          </Box>
        )}
      </Paper>

      {/* Optimization Results */}
      {optimizationComplete && (
        <Alert severity="success" sx={{ mb: 3 }}>
          <AlertTitle>Optimization Complete</AlertTitle>
          Analysis complete! {scenarios.length} scenarios generated with cost optimization and risk assessment.
        </Alert>
      )}

      {/* Scenario Comparison */}
      <Grid container spacing={3}>
        {scenarios.map((scenario) => (
          <Grid item xs={12} md={4} key={scenario.id}>
            <Card 
              sx={{ 
                height: '100%',
                border: selectedScenario?.id === scenario.id ? 2 : 0,
                borderColor: 'primary.main',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedScenario(scenario)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Typography variant="h6" component="div">
                    {scenario.name}
                  </Typography>
                  <Chip
                    label={scenario.recommendation}
                    color={getRecommendationColor(scenario.recommendation) as any}
                    size="small"
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {scenario.description}
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CostIcon sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">
                        ${scenario.costs.total.toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <TimeIcon sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">
                        {scenario.metrics.deliveryTime}h
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <RiskIcon sx={{ mr: 1, fontSize: 20 }} />
                      <Chip
                        label={`Risk: ${scenario.metrics.riskScore}/10`}
                        color={getRiskColor(scenario.metrics.riskScore) as any}
                        size="small"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      {scenario.metrics.serviceLevel}% Service
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              
              <CardActions>
                <Button size="small" onClick={() => setShowDetails(true)}>
                  View Details
                </Button>
                {selectedScenario?.id === scenario.id && (
                  <Button 
                    size="small" 
                    variant="contained" 
                    onClick={() => handleDecision('approve')}
                    disabled={decisionMade === 'approve'}
                  >
                    {decisionMade === 'approve' ? 'Approved' : 'Approve'}
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Decision Panel */}
      {selectedScenario && !decisionMade && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Decision Required: {selectedScenario.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                startIcon={<ApproveIcon />}
                onClick={() => handleDecision('approve')}
              >
                Approve & Execute
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="warning"
                onClick={() => handleDecision('modify')}
              >
                Request Modifications
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="error"
                startIcon={<RejectIcon />}
                onClick={() => handleDecision('reject')}
              >
                Reject
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Decision Confirmation */}
      {decisionMade && (
        <Alert 
          severity={decisionMade === 'approve' ? 'success' : decisionMade === 'reject' ? 'error' : 'info'} 
          sx={{ mt: 3 }}
        >
          <AlertTitle>
            {decisionMade === 'approve' ? 'Scenario Approved' : 
             decisionMade === 'reject' ? 'Scenario Rejected' : 'Modification Requested'}
          </AlertTitle>
          {decisionMade === 'approve' && selectedScenario && 
            `"${selectedScenario.name}" has been approved and will be executed automatically.`}
          {decisionMade === 'reject' && 
            'The scenario has been rejected. Please select an alternative or run a new optimization.'}
          {decisionMade === 'modify' && 
            'Modification request submitted. The optimization team will review and provide updated scenarios.'}
        </Alert>
      )}

      {/* Detailed View Dialog */}
      <Dialog open={showDetails} onClose={() => setShowDetails(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          Detailed Analysis: {selectedScenario?.name}
        </DialogTitle>
        <DialogContent>
          {selectedScenario && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Cost Breakdown</Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Component</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">%</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getCostBreakdown(selectedScenario).map((item) => (
                        <TableRow key={item.component}>
                          <TableCell>{item.component}</TableCell>
                          <TableCell align="right">${item.amount.toLocaleString()}</TableCell>
                          <TableCell align="right">{item.percentage}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Action Items</Typography>
                {selectedScenario.actions.map((action) => (
                  <Card key={action.id} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle2">{action.type}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {action.description}
                      </Typography>
                      <Typography variant="caption" display="block">
                        Cost: ${action.estimatedCost} | Time: {action.estimatedTime}h
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDetails(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NetworkOptimization;
