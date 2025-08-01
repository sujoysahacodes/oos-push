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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider
} from '@mui/material';
import {
  Settings as SystemIcon,
  CheckCircle as SuccessIcon,
  Schedule as PendingIcon,
  Error as ErrorIcon,
  Sync as SyncIcon,
  Storage as DatabaseIcon,
  CloudSync as CloudIcon,
  Notifications as NotificationIcon,
  LocalShipping as DeliveryIcon,
  Assignment as TicketIcon,
  PlayArrow as ExecuteIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

interface SystemExecutionProps {
  executionPlan: any;
  ticketId: string;
  onExecutionComplete: (result: any) => void;
}

const SystemExecution: React.FC<SystemExecutionProps> = ({
  executionPlan,
  ticketId,
  onExecutionComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [executionStatus, setExecutionStatus] = useState<any[]>([]);
  const [systemIntegrations, setSystemIntegrations] = useState<any[]>([]);
  const [showSystemDetails, setShowSystemDetails] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionComplete, setExecutionComplete] = useState(false);

  const targetSystems = [
    {
      name: 'Supply Chain Management (SSM)',
      type: 'order_management',
      status: 'connected',
      lastSync: new Date(Date.now() - 300000).toISOString(), // 5 min ago
      actions: ['Update delivery orders', 'Modify shipment quantities', 'Create transfer orders'],
      apiEndpoint: '/api/ssm/orders',
      authentication: 'OAuth 2.0'
    },
    {
      name: 'Warehouse Management System',
      type: 'inventory',
      status: 'connected',
      lastSync: new Date(Date.now() - 120000).toISOString(), // 2 min ago
      actions: ['Reserve inventory', 'Update stock levels', 'Create pick lists'],
      apiEndpoint: '/api/wms/inventory',
      authentication: 'API Key'
    },
    {
      name: 'Transportation Management',
      type: 'logistics',
      status: 'connected',
      lastSync: new Date(Date.now() - 180000).toISOString(), // 3 min ago
      actions: ['Schedule deliveries', 'Route optimization', 'Track shipments'],
      apiEndpoint: '/api/tms/shipments',
      authentication: 'Service Account'
    },
    {
      name: 'ServiceNow Ticketing',
      type: 'ticketing',
      status: 'connected',
      lastSync: new Date(Date.now() - 60000).toISOString(), // 1 min ago
      actions: ['Update ticket status', 'Add resolution notes', 'Close tickets'],
      apiEndpoint: '/api/servicenow/tickets',
      authentication: 'Basic Auth'
    },
    {
      name: 'Communication Platform',
      type: 'communication',
      status: 'connected',
      lastSync: new Date(Date.now() - 90000).toISOString(), // 1.5 min ago
      actions: ['Send notifications', 'Email alerts', 'SMS updates'],
      apiEndpoint: '/api/comms/notifications',
      authentication: 'JWT Token'
    }
  ];

  useEffect(() => {
    setSystemIntegrations(targetSystems);
    if (executionPlan && executionPlan.actions) {
      setExecutionStatus(
        executionPlan.actions.map((action: any) => ({
          ...action,
          status: 'pending',
          startTime: null,
          endTime: null,
          result: null,
          systemCalls: []
        }))
      );
    }
  }, [executionPlan]);

  const executeResolutionPlan = async () => {
    setIsExecuting(true);
    setCurrentStep(0);

    for (let i = 0; i < executionStatus.length; i++) {
      setCurrentStep(i);
      
      // Update status to executing
      setExecutionStatus(prev => prev.map((status, idx) => 
        idx === i ? { ...status, status: 'executing', startTime: new Date().toISOString() } : status
      ));

      // Simulate system integration calls
      const systemCalls = await executeSystemIntegrations(executionStatus[i]);
      
      // Wait for execution (simulate processing time)
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
      
      // Update status to completed
      setExecutionStatus(prev => prev.map((status, idx) => 
        idx === i ? { 
          ...status, 
          status: 'completed', 
          endTime: new Date().toISOString(),
          result: 'Success',
          systemCalls 
        } : status
      ));
    }

    setExecutionComplete(true);
    setIsExecuting(false);
    
    // Prepare final execution result
    const executionResult = {
      ticketId,
      plan: executionPlan,
      executionSteps: executionStatus,
      completedAt: new Date().toISOString(),
      status: 'completed',
      systemIntegrations: systemIntegrations.map(sys => ({
        system: sys.name,
        calls: Math.floor(Math.random() * 5) + 1,
        success: true
      }))
    };

    onExecutionComplete(executionResult);
  };

  const executeSystemIntegrations = async (step: any) => {
    const calls = [];
    
    // Determine which systems to call based on the step
    if (step.action.toLowerCase().includes('inventory') || step.action.toLowerCase().includes('allocate')) {
      calls.push({
        system: 'Warehouse Management System',
        endpoint: '/api/wms/inventory/reserve',
        method: 'POST',
        payload: { sku: 'BUD-12OZ-24PK', quantity: 120, wholesaler: 'WH001' },
        response: { success: true, reservationId: 'RES-' + Date.now(), stockReserved: 120 },
        timestamp: new Date().toISOString()
      });
    }
    
    if (step.action.toLowerCase().includes('delivery') || step.action.toLowerCase().includes('shipment')) {
      calls.push({
        system: 'Supply Chain Management (SSM)',
        endpoint: '/api/ssm/orders/modify',
        method: 'PUT',
        payload: { orderId: 'ORD-2025-0801-001', addItems: [{ sku: 'BUD-12OZ-24PK', quantity: 120 }] },
        response: { success: true, orderUpdated: true, newTotal: 360 },
        timestamp: new Date().toISOString()
      });
      
      calls.push({
        system: 'Transportation Management',
        endpoint: '/api/tms/shipments/update',
        method: 'PUT',
        payload: { shipmentId: 'SHIP-2025-001', updatedWeight: 'recalculated' },
        response: { success: true, routeOptimized: true, eta: '2025-08-02T14:00:00Z' },
        timestamp: new Date().toISOString()
      });
    }
    
    if (step.action.toLowerCase().includes('notify') || step.action.toLowerCase().includes('communication')) {
      calls.push({
        system: 'Communication Platform',
        endpoint: '/api/comms/send',
        method: 'POST',
        payload: { 
          type: 'email', 
          recipient: 'john.smith@metrobeer.com', 
          subject: 'OOS Resolution Update',
          template: 'oos_resolution_update'
        },
        response: { success: true, messageId: 'MSG-' + Date.now(), delivered: true },
        timestamp: new Date().toISOString()
      });
    }

    // Always update the ticket
    calls.push({
      system: 'ServiceNow Ticketing',
      endpoint: '/api/servicenow/tickets/update',
      method: 'PUT',
      payload: { 
        ticketId: ticketId, 
        status: 'in_progress', 
        notes: `Step completed: ${step.action}`,
        lastModified: new Date().toISOString()
      },
      response: { success: true, ticketUpdated: true, version: 'v' + (Math.floor(Math.random() * 10) + 1) },
      timestamp: new Date().toISOString()
    });

    return calls;
  };

  const getSystemIcon = (type: string) => {
    switch (type) {
      case 'order_management': return <DatabaseIcon />;
      case 'inventory': return <SystemIcon />;
      case 'logistics': return <DeliveryIcon />;
      case 'ticketing': return <TicketIcon />;
      case 'communication': return <NotificationIcon />;
      default: return <CloudIcon />;
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed': return <SuccessIcon color="success" />;
      case 'executing': return <SyncIcon color="primary" />;
      case 'pending': return <PendingIcon color="disabled" />;
      case 'error': return <ErrorIcon color="error" />;
      default: return <PendingIcon />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'executing': return 'primary';
      case 'pending': return 'default';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SystemIcon sx={{ mr: 2 }} />
              <Typography variant="h6">
                System Integration & Execution
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => setShowSystemDetails(true)}
              >
                System Status
              </Button>
              {!isExecuting && !executionComplete && (
                <Button
                  variant="contained"
                  startIcon={<ExecuteIcon />}
                  onClick={executeResolutionPlan}
                  disabled={!executionPlan}
                >
                  Execute Plan
                </Button>
              )}
            </Box>
          </Box>
          
          {!isExecuting && !executionComplete && (
            <Alert severity="info">
              Ready to execute resolution plan across {systemIntegrations.length} integrated systems.
            </Alert>
          )}
          
          {isExecuting && (
            <Alert severity="info" icon={<SyncIcon />}>
              Executing resolution plan - Step {currentStep + 1} of {executionStatus.length}
            </Alert>
          )}
          
          {executionComplete && (
            <Alert severity="success" icon={<SuccessIcon />}>
              Resolution plan executed successfully! All systems updated and wholesaler notified.
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* System Integrations Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {systemIntegrations.map((system) => (
          <Grid item xs={12} md={6} lg={4} key={system.name}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {getSystemIcon(system.type)}
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    {system.name}
                  </Typography>
                </Box>
                
                <Chip 
                  label={system.status === 'connected' ? 'Connected' : 'Disconnected'}
                  color={system.status === 'connected' ? 'success' : 'error'}
                  size="small"
                  sx={{ mb: 1 }}
                />
                
                <Typography variant="body2" color="text.secondary">
                  Last sync: {new Date(system.lastSync).toLocaleTimeString()}
                </Typography>
                
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Actions: {system.actions.join(', ')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Execution Steps */}
      {executionStatus.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Execution Progress
            </Typography>
            
            <Stepper orientation="vertical" activeStep={currentStep}>
              {executionStatus.map((step, index) => (
                <Step key={index} completed={step.status === 'completed'}>
                  <StepLabel 
                    StepIconComponent={() => getStepIcon(step.status)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="subtitle2">
                        {step.action}
                      </Typography>
                      <Chip 
                        label={step.status} 
                        color={getStatusColor(step.status) as any}
                        size="small"
                      />
                    </Box>
                  </StepLabel>
                  <StepContent>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Timeline: {step.timeline} | System: {step.system}
                      </Typography>
                      
                      {step.startTime && (
                        <Typography variant="caption" display="block">
                          Started: {new Date(step.startTime).toLocaleTimeString()}
                        </Typography>
                      )}
                      
                      {step.endTime && (
                        <Typography variant="caption" display="block">
                          Completed: {new Date(step.endTime).toLocaleTimeString()}
                        </Typography>
                      )}
                      
                      {step.systemCalls && step.systemCalls.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            System calls made: {step.systemCalls.length}
                          </Typography>
                          {step.systemCalls.map((call: any, idx: number) => (
                            <Chip 
                              key={idx}
                              label={call.system}
                              size="small"
                              variant="outlined"
                              sx={{ ml: 1, mt: 0.5 }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                    
                    {step.status === 'executing' && (
                      <LinearProgress sx={{ mb: 2 }} />
                    )}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>
      )}

      {/* System Details Dialog */}
      <Dialog
        open={showSystemDetails}
        onClose={() => setShowSystemDetails(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          System Integration Status
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>System</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Sync</TableCell>
                  <TableCell>API Endpoint</TableCell>
                  <TableCell>Auth Method</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {systemIntegrations.map((system) => (
                  <TableRow key={system.name}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {getSystemIcon(system.type)}
                        <Typography sx={{ ml: 1 }}>
                          {system.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{system.type}</TableCell>
                    <TableCell>
                      <Chip 
                        label={system.status}
                        color={system.status === 'connected' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(system.lastSync).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" fontFamily="monospace">
                        {system.apiEndpoint}
                      </Typography>
                    </TableCell>
                    <TableCell>{system.authentication}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>
            Available Actions by System
          </Typography>
          
          {systemIntegrations.map((system) => (
            <Box key={system.name} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                {system.name}
              </Typography>
              <List dense>
                {system.actions.map((action: string, idx: number) => (
                  <ListItem key={idx}>
                    <ListItemIcon>
                      <SuccessIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={action} />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSystemDetails(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SystemExecution;
