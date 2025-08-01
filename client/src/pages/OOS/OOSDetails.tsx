import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  LinearProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  SmartToy as AIIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  Inventory as InventoryIcon,
  LocalShipping as ShippingIcon,
  ExpandMore as ExpandMoreIcon,
  Psychology as PsychologyIcon,
  Assignment as AssignmentIcon,
  Circle as CircleIcon
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const OOSDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [aiProcessing, setAiProcessing] = useState(false);

  useEffect(() => {
    fetchTicketDetails();
  }, [id]);

  const fetchTicketDetails = async () => {
    // Mock ticket data with full AI processing workflow
    const mockTicket = {
      id: id || 'OOS-001',
      status: 'AI_Processing_Complete',
      priority: 'High',
      createdAt: '2025-08-01T09:30:00Z',
      channel: 'hotline',
      wholesaler: {
        id: 'WH001',
        name: 'Metro Beer Distributors',
        location: 'Chicago, IL',
        contact: {
          name: 'John Smith',
          phone: '+1-312-555-0123',
          email: 'john.smith@metrobeer.com'
        }
      },
      originalRequest: {
        description: `We are experiencing an urgent out-of-stock situation with Budweiser 12oz 24-packs. 
        Our inventory shows zero units available, and we have pending orders for approximately 10 pallets (240 cases). 
        This is impacting multiple retail locations in the Chicago metro area. We need immediate resolution 
        as we have a major promotional event this weekend. Please expedite delivery of 15 pallets to cover 
        both backlog and weekend demand.`,
        urgency: 'High',
        contactInfo: 'John Smith - john.smith@metrobeer.com - 312-555-0123'
      },
      aiAnalysis: {
        confidence: 94.3,
        parsedData: {
          sku: 'BUD-12OZ-24PK',
          productName: 'Budweiser 12oz 24-pack',
          requestedQuantity: 360, // 15 pallets * 24 cases
          urgency: 'High',
          reason: 'Promotional event weekend demand',
          impactedLocations: ['Chicago Metro Area'],
          timeline: 'Weekend promotional event'
        },
        keyInsights: [
          'Critical timing due to weekend promotional event',
          'Quantity request increased from 10 to 15 pallets to cover backlog',
          'Multiple retail locations affected',
          'High revenue impact potential'
        ],
        riskFactors: [
          'Weekend delivery logistics complexity',
          'Promotional event cannot be postponed',
          'Multiple retail locations dependent on resolution'
        ]
      },
      inventoryValidation: {
        available: 280,
        required: 360,
        shortfall: 80,
        alternativeOptions: [
          { sku: 'BUD-12OZ-12PK', available: 150, conversionFactor: 2 },
          { sku: 'BUD-16OZ-24PK', available: 120, conversionFactor: 0.75 }
        ],
        nearbyWarehouses: [
          { location: 'Milwaukee, WI', distance: '90 miles', stock: 500 },
          { location: 'Indianapolis, IN', distance: '185 miles', stock: 300 }
        ]
      },
      resolutionPlan: {
        strategy: 'Multi-source fulfillment with expedited logistics',
        actions: [
          {
            action: 'Immediate allocation of 280 cases from Chicago warehouse',
            timeline: 'Within 2 hours',
            status: 'Completed',
            responsible: 'Inventory Management'
          },
          {
            action: 'Emergency transfer of 80 cases from Milwaukee warehouse',
            timeline: 'Next day delivery',
            status: 'In Progress',
            responsible: 'Logistics Team'
          },
          {
            action: 'Expedited delivery coordination for weekend arrival',
            timeline: 'Friday by 5 PM',
            status: 'Scheduled',
            responsible: 'Transportation'
          }
        ],
        estimatedResolution: '24 hours',
        cost: '$2,450 (expedited shipping)',
        alternatives: 'Partial fulfillment with alternative SKUs if needed'
      },
      timeline: [
        {
          timestamp: '2025-08-01T09:30:00Z',
          event: 'OOS request received via hotline',
          type: 'request',
          description: 'Initial request logged from Metro Beer Distributors'
        },
        {
          timestamp: '2025-08-01T09:31:30Z',
          event: 'AI Copilot analysis initiated',
          type: 'ai_processing',
          description: 'Natural language processing of request started'
        },
        {
          timestamp: '2025-08-01T09:32:45Z',
          event: 'Request parsed and structured',
          type: 'ai_complete',
          description: 'AI extracted key data with 94.3% confidence'
        },
        {
          timestamp: '2025-08-01T09:35:00Z',
          event: 'Inventory validation completed',
          type: 'validation',
          description: 'Real-time inventory check identified shortfall'
        },
        {
          timestamp: '2025-08-01T09:38:00Z',
          event: 'Resolution plan generated',
          type: 'planning',
          description: 'Multi-source fulfillment strategy created'
        },
        {
          timestamp: '2025-08-01T09:40:00Z',
          event: 'Plan execution initiated',
          type: 'execution',
          description: 'Inventory allocation and logistics coordination started'
        }
      ]
    };

    setTicket(mockTicket);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AI_Processing_Complete': return 'info';
      case 'Resolved': return 'success';
      case 'In_Progress': return 'warning';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <LinearProgress />
        <Typography>Loading ticket details...</Typography>
      </Box>
    );
  }

  if (!ticket) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" color="error">Ticket not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button 
          startIcon={<BackIcon />} 
          onClick={() => navigate('/oos')}
          sx={{ mr: 2 }}
        >
          Back to Tickets
        </Button>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" component="h1">
            OOS Ticket {ticket.id}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Chip 
              label={ticket.status.replace('_', ' ')} 
              color={getStatusColor(ticket.status) as any}
            />
            <Chip 
              label={`Priority: ${ticket.priority}`} 
              color={getPriorityColor(ticket.priority) as any}
            />
            <Chip 
              label={`Channel: ${ticket.channel}`} 
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Original Request */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <AssignmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Original Request
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                <strong>From:</strong> {ticket.wholesaler.name} ({ticket.wholesaler.contact.name})
              </Alert>
              <Paper sx={{ p: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.300' }}>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line', fontStyle: 'italic' }}>
                  "{ticket.originalRequest.description}"
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        {/* AI Analysis */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <PsychologyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                AI Copilot Analysis
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Confidence Level: {ticket.aiAnalysis.confidence}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={ticket.aiAnalysis.confidence} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>Parsed Data:</Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell><strong>SKU:</strong></TableCell>
                    <TableCell>{ticket.aiAnalysis.parsedData.sku}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Product:</strong></TableCell>
                    <TableCell>{ticket.aiAnalysis.parsedData.productName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Quantity:</strong></TableCell>
                    <TableCell>{ticket.aiAnalysis.parsedData.requestedQuantity} cases</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Urgency:</strong></TableCell>
                    <TableCell>
                      <Chip 
                        label={ticket.aiAnalysis.parsedData.urgency} 
                        color="error" 
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* Inventory Validation */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <InventoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Inventory Validation
              </Typography>
              
              <Alert severity="warning" sx={{ mb: 2 }}>
                Shortfall: {ticket.inventoryValidation.shortfall} cases
              </Alert>

              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Available:</strong></TableCell>
                    <TableCell>{ticket.inventoryValidation.available} cases</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Required:</strong></TableCell>
                    <TableCell>{ticket.inventoryValidation.required} cases</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                Nearby Warehouses:
              </Typography>
              {ticket.inventoryValidation.nearbyWarehouses.map((warehouse: any, idx: number) => (
                <Chip 
                  key={idx}
                  label={`${warehouse.location}: ${warehouse.stock} cases`}
                  variant="outlined"
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Resolution Plan */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <ShippingIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                AI-Generated Resolution Plan
              </Typography>
              
              <Alert severity="success" sx={{ mb: 2 }}>
                <strong>Strategy:</strong> {ticket.resolutionPlan.strategy}
              </Alert>

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Estimated Resolution
                  </Typography>
                  <Typography variant="h6">
                    {ticket.resolutionPlan.estimatedResolution}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Additional Cost
                  </Typography>
                  <Typography variant="h6" color="warning.main">
                    {ticket.resolutionPlan.cost}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Actions Status
                  </Typography>
                  <Typography variant="h6">
                    {ticket.resolutionPlan.actions.filter((a: any) => a.status === 'Completed').length} of {ticket.resolutionPlan.actions.length} completed
                  </Typography>
                </Grid>
              </Grid>

              <Stepper orientation="vertical">
                {ticket.resolutionPlan.actions.map((action: any, index: number) => (
                  <Step key={index} active={true} completed={action.status === 'Completed'}>
                    <StepLabel 
                      StepIconComponent={() => 
                        action.status === 'Completed' ? 
                          <CheckIcon color="success" /> : 
                          <ScheduleIcon color="warning" />
                      }
                    >
                      <Typography variant="subtitle1">
                        {action.action}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Chip 
                          label={`Timeline: ${action.timeline}`} 
                          size="small" 
                          variant="outlined"
                        />
                        <Chip 
                          label={`Status: ${action.status}`} 
                          size="small" 
                          color={action.status === 'Completed' ? 'success' : 'warning'}
                        />
                        <Chip 
                          label={`Owner: ${action.responsible}`} 
                          size="small" 
                          variant="outlined"
                        />
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>

        {/* Timeline */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Processing Timeline
              </Typography>
              
              <List>
                {ticket.timeline.map((event: any, index: number) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemIcon>
                      <CircleIcon 
                        color={event.type === 'ai_complete' ? 'primary' : 'disabled'}
                        sx={{ fontSize: 12 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2">
                          {event.event}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(event.timestamp).toLocaleString()}
                          </Typography>
                          <Typography variant="body2">
                            {event.description}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OOSDetails;
