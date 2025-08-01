import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Alert,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Chip,
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Psychology as AIIcon,
  LocalShipping as ShippingIcon,
  Factory as FactoryIcon,
  Route as RouteIcon,
  Schedule as ScheduleIcon,
  AttachMoney as CostIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  TrendingUp as OptimizeIcon,
  Inventory as InventoryIcon,
  FlightTakeoff as ExpressIcon
} from '@mui/icons-material';

interface ResolutionPlannerProps {
  validationResults: any;
  ticketId: string;
  onPlanComplete: (plan: any) => void;
}

const ResolutionPlanner: React.FC<ResolutionPlannerProps> = ({
  validationResults,
  ticketId,
  onPlanComplete
}) => {
  const [planningStep, setPlanningStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [resolutionOptions, setResolutionOptions] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);

  const planningSteps = [
    'Analyzing supply options',
    'Calculating delivery routes', 
    'Optimizing cost-efficiency',
    'Evaluating risk factors',
    'Generating resolution plans',
    'Ranking recommendations'
  ];

  useEffect(() => {
    generateResolutionPlans();
  }, []);

  const generateResolutionPlans = async () => {
    setIsProcessing(true);
    
    for (let i = 0; i < planningSteps.length; i++) {
      setPlanningStep(i);
      setProgress((i / planningSteps.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    // Generate multiple resolution options
    const options = [
      {
        id: 'plan-1',
        name: 'Standard Fulfillment',
        type: 'standard',
        confidence: 92,
        estimatedTime: '18 hours',
        cost: '$450',
        riskLevel: 'Low',
        description: 'Use existing inventory and scheduled deliveries',
        actions: [
          {
            step: 1,
            action: 'Allocate 120 cases from current wholesaler inventory',
            timeline: 'Immediate',
            system: 'Inventory Management',
            status: 'ready'
          },
          {
            step: 2,
            action: 'Add 120 cases to tomorrow\'s scheduled delivery (ORD-2025-0801-001)',
            timeline: '2 hours',
            system: 'Supply Chain Management (SSM)',
            status: 'ready'
          },
          {
            step: 3,
            action: 'Notify wholesaler of updated delivery',
            timeline: '15 minutes',
            system: 'Communication Platform',
            status: 'ready'
          }
        ],
        pros: [
          'Lowest cost option',
          'Uses existing logistics',
          'Minimal disruption to supply chain'
        ],
        cons: [
          'Longer delivery time',
          'Depends on scheduled delivery'
        ]
      },
      {
        id: 'plan-2',
        name: 'Expedited Fulfillment',
        type: 'expedited',
        confidence: 88,
        estimatedTime: '8 hours',
        cost: '$1,250',
        riskLevel: 'Medium',
        description: 'Emergency shipment from nearby warehouse',
        actions: [
          {
            step: 1,
            action: 'Reserve 240 cases from Chicago Distribution Center',
            timeline: '30 minutes',
            system: 'Warehouse Management',
            status: 'ready'
          },
          {
            step: 2,
            action: 'Schedule emergency delivery truck',
            timeline: '1 hour',
            system: 'Transportation Management',
            status: 'ready'
          },
          {
            step: 3,
            action: 'Dispatch truck with expedited delivery',
            timeline: '2 hours',
            system: 'Logistics Coordination',
            status: 'ready'
          },
          {
            step: 4,
            action: 'Real-time delivery tracking and notification',
            timeline: 'Continuous',
            system: 'Tracking System',
            status: 'ready'
          }
        ],
        pros: [
          'Fastest delivery option',
          'High reliability',
          'Real-time tracking'
        ],
        cons: [
          'Higher cost',
          'Requires emergency logistics coordination'
        ]
      },
      {
        id: 'plan-3',
        name: 'Multi-Source Optimization',
        type: 'optimized',
        confidence: 95,
        estimatedTime: '12 hours',
        cost: '$780',
        riskLevel: 'Low',
        description: 'Balanced approach using multiple supply sources',
        actions: [
          {
            step: 1,
            action: 'Allocate 100 cases from current inventory',
            timeline: 'Immediate',
            system: 'Inventory Management',
            status: 'ready'
          },
          {
            step: 2,
            action: 'Transfer 140 cases from Milwaukee hub',
            timeline: '4 hours',
            system: 'Inter-facility Transfer',
            status: 'ready'
          },
          {
            step: 3,
            action: 'Coordinate combined delivery',
            timeline: '8 hours',
            system: 'Supply Chain Management',
            status: 'ready'
          },
          {
            step: 4,
            action: 'Quality check and delivery confirmation',
            timeline: '12 hours',
            system: 'Quality Assurance',
            status: 'ready'
          }
        ],
        pros: [
          'Optimal cost-time balance',
          'Risk diversification',
          'High success probability'
        ],
        cons: [
          'More complex coordination',
          'Multiple system integrations required'
        ]
      }
    ];

    // AI recommendation logic
    const recommendedPlan = options.reduce((prev, current) => 
      (current.confidence > prev.confidence) ? current : prev
    );
    (recommendedPlan as any).recommended = true;

    setResolutionOptions(options);
    setSelectedPlan(recommendedPlan);
    setProgress(100);
    setIsProcessing(false);
  };

  const handleExecutePlan = async () => {
    if (!selectedPlan) return;

    // Simulate plan execution
    const executionPlan = {
      ...selectedPlan,
      ticketId,
      executionStarted: new Date().toISOString(),
      status: 'executing',
      executionSteps: selectedPlan.actions.map((action: any, index: number) => ({
        ...action,
        status: index === 0 ? 'executing' : 'pending',
        estimatedCompletion: new Date(Date.now() + (index + 1) * 3600000).toISOString()
      }))
    };

    onPlanComplete(executionPlan);
  };

  const getPlanIcon = (type: string) => {
    switch (type) {
      case 'standard': return <ScheduleIcon />;
      case 'expedited': return <ExpressIcon />;
      case 'optimized': return <OptimizeIcon />;
      default: return <RouteIcon />;
    }
  };

  const getPlanColor = (type: string) => {
    switch (type) {
      case 'standard': return 'primary';
      case 'expedited': return 'warning';
      case 'optimized': return 'success';
      default: return 'default';
    }
  };

  if (isProcessing) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AIIcon sx={{ mr: 2 }} />
            <Typography variant="h6">
              AI Resolution Planning in Progress
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {planningSteps[planningStep]}
          </Typography>
          
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ mb: 2, height: 8, borderRadius: 4 }}
          />
          
          <Typography variant="caption" color="text.secondary">
            Analyzing supply chain options, optimizing routes, and calculating cost-efficiency...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AIIcon sx={{ mr: 2 }} />
            <Typography variant="h6">
              AI Resolution Plans Generated
            </Typography>
          </Box>
          
          <Alert severity="info" sx={{ mb: 2 }}>
            AI Copilot has analyzed {resolutionOptions.length} resolution strategies. 
            Recommended plan is highlighted based on optimal cost-time-risk balance.
          </Alert>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {resolutionOptions.map((option) => (
          <Grid item xs={12} md={4} key={option.id}>
            <Card 
              sx={{ 
                height: '100%',
                border: selectedPlan?.id === option.id ? 2 : 1,
                borderColor: selectedPlan?.id === option.id ? 'primary.main' : 'grey.300',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={() => setSelectedPlan(option)}
            >
              {option.recommended && (
                <Chip 
                  label="AI Recommended" 
                  color="success" 
                  size="small"
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                />
              )}
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {getPlanIcon(option.type)}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {option.name}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {option.description}
                </Typography>
                
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Time</Typography>
                    <Typography variant="body2" fontWeight="bold">{option.estimatedTime}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Cost</Typography>
                    <Typography variant="body2" fontWeight="bold">{option.cost}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Confidence</Typography>
                    <Typography variant="body2" fontWeight="bold">{option.confidence}%</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Risk</Typography>
                    <Chip 
                      label={option.riskLevel} 
                      color={option.riskLevel === 'Low' ? 'success' : option.riskLevel === 'Medium' ? 'warning' : 'error'}
                      size="small"
                    />
                  </Grid>
                </Grid>
                
                <Typography variant="subtitle2" gutterBottom>Actions ({option.actions.length})</Typography>
                <Box sx={{ maxHeight: 100, overflowY: 'auto' }}>
                  {option.actions.slice(0, 2).map((action: any, idx: number) => (
                    <Typography key={idx} variant="caption" display="block" sx={{ mb: 0.5 }}>
                      {idx + 1}. {action.action}
                    </Typography>
                  ))}
                  {option.actions.length > 2 && (
                    <Typography variant="caption" color="text.secondary">
                      +{option.actions.length - 2} more steps...
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedPlan && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Selected Plan: {selectedPlan.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => setShowPlanDetails(true)}
                >
                  View Details
                </Button>
                <Button
                  variant="contained"
                  onClick={handleExecutePlan}
                  startIcon={<CheckIcon />}
                >
                  Execute Plan
                </Button>
              </Box>
            </Box>
            
            <Alert severity="success" sx={{ mb: 2 }}>
              This plan will resolve the OOS situation in {selectedPlan.estimatedTime} with {selectedPlan.confidence}% confidence.
            </Alert>

            <Stepper orientation="vertical">
              {selectedPlan.actions.map((action: any, index: number) => (
                <Step key={index} active={true} completed={false}>
                  <StepLabel>
                    <Typography variant="subtitle2">
                      {action.action}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Chip label={`Timeline: ${action.timeline}`} size="small" variant="outlined" />
                      <Chip label={`System: ${action.system}`} size="small" variant="outlined" />
                      <Chip 
                        label={`Status: ${action.status}`} 
                        size="small" 
                        color="success"
                      />
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>
      )}

      {/* Plan Details Dialog */}
      <Dialog
        open={showPlanDetails}
        onClose={() => setShowPlanDetails(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedPlan?.name} - Detailed Analysis
        </DialogTitle>
        <DialogContent>
          {selectedPlan && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom color="success.main">
                  Advantages
                </Typography>
                <List dense>
                  {selectedPlan.pros.map((pro: string, idx: number) => (
                    <ListItem key={idx}>
                      <ListItemIcon>
                        <CheckIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={pro} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom color="warning.main">
                  Considerations
                </Typography>
                <List dense>
                  {selectedPlan.cons.map((con: string, idx: number) => (
                    <ListItem key={idx}>
                      <ListItemIcon>
                        <WarningIcon color="warning" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={con} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Execution Timeline
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Step</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell>Timeline</TableCell>
                        <TableCell>System</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedPlan.actions.map((action: any, idx: number) => (
                        <TableRow key={idx}>
                          <TableCell>{action.step}</TableCell>
                          <TableCell>{action.action}</TableCell>
                          <TableCell>{action.timeline}</TableCell>
                          <TableCell>{action.system}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPlanDetails(false)}>Close</Button>
          <Button onClick={handleExecutePlan} variant="contained">
            Execute This Plan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResolutionPlanner;
