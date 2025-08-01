import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  AlertTitle,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  LinearProgress
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Warning as AlertIcon,
  CheckCircle as SuccessIcon,
  Schedule as PendingIcon,
  TrendingUp as TrendIcon,
  PlayArrow as ExecuteIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  Settings as ConfigIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreIcon,
  Notifications as NotificationIcon,
  Assignment as TaskIcon,
  Speed as PerformanceIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ActionableItem {
  id: string;
  type: 'Critical' | 'Warning' | 'Info' | 'Success';
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedTime: string;
  cost: number;
  actions: ActionButton[];
  status: 'Pending' | 'In_Progress' | 'Completed' | 'Failed';
  dueDate: Date;
  impactScore: number;
}

interface ActionButton {
  label: string;
  action: string;
  variant: 'contained' | 'outlined' | 'text';
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  disabled?: boolean;
}

interface SystemStatus {
  name: string;
  status: 'Online' | 'Offline' | 'Warning' | 'Maintenance';
  lastUpdate: Date;
  responseTime: number;
  uptime: number;
}

const ActionableDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [actionableItems, setActionableItems] = useState<ActionableItem[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<ActionableItem | null>(null);
  const [isExecuting, setIsExecuting] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = () => {
    // Mock actionable items
    const mockItems: ActionableItem[] = [
      {
        id: 'ACT001',
        type: 'Critical',
        title: 'Budweiser Stockout - Metro Beverage',
        description: 'Critical stockout situation requiring immediate attention. Current inventory: 0 cases, Demand: 72 cases',
        priority: 'High',
        estimatedTime: '2-4 hours',
        cost: 2850,
        status: 'Pending',
        dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
        impactScore: 95,
        actions: [
          { label: 'Execute Best Plan', action: 'execute_optimal', variant: 'contained', color: 'primary' },
          { label: 'View Options', action: 'view_options', variant: 'outlined', color: 'primary' },
          { label: 'Escalate', action: 'escalate', variant: 'text', color: 'warning' }
        ]
      },
      {
        id: 'ACT002',
        type: 'Warning',
        title: 'Inventory Rebalancing Required',
        description: 'Atlanta hub showing overstock while Chicago is running low on Stella Artois',
        priority: 'Medium',
        estimatedTime: '6-8 hours',
        cost: 1200,
        status: 'Pending',
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        impactScore: 65,
        actions: [
          { label: 'Schedule Transfer', action: 'schedule_transfer', variant: 'contained', color: 'primary' },
          { label: 'Analyze Route', action: 'analyze_route', variant: 'outlined', color: 'primary' },
          { label: 'Defer', action: 'defer', variant: 'text', color: 'secondary' }
        ]
      },
      {
        id: 'ACT003',
        type: 'Info',
        title: 'Route Optimization Available',
        description: 'New optimization available that could save $450 on tomorrow\'s deliveries',
        priority: 'Low',
        estimatedTime: '1 hour',
        cost: -450, // Negative cost = savings
        status: 'Pending',
        dueDate: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
        impactScore: 40,
        actions: [
          { label: 'Apply Optimization', action: 'apply_optimization', variant: 'contained', color: 'success' },
          { label: 'Review Details', action: 'review_details', variant: 'outlined', color: 'primary' }
        ]
      },
      {
        id: 'ACT004',
        type: 'Success',
        title: 'Delivery Completed Successfully',
        description: 'Emergency shipment to Southeast Beverage Co completed ahead of schedule',
        priority: 'Low',
        estimatedTime: 'Completed',
        cost: 1800,
        status: 'Completed',
        dueDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        impactScore: 85,
        actions: [
          { label: 'View Report', action: 'view_report', variant: 'outlined', color: 'primary' },
          { label: 'Archive', action: 'archive', variant: 'text', color: 'secondary' }
        ]
      }
    ];

    // Mock system status
    const mockSystemStatus: SystemStatus[] = [
      { name: 'Inventory Management', status: 'Online', lastUpdate: new Date(), responseTime: 120, uptime: 99.8 },
      { name: 'Transportation System', status: 'Online', lastUpdate: new Date(), responseTime: 95, uptime: 99.9 },
      { name: 'Wholesaler Portal', status: 'Warning', lastUpdate: new Date(Date.now() - 5 * 60 * 1000), responseTime: 350, uptime: 98.5 },
      { name: 'AI Optimization Engine', status: 'Online', lastUpdate: new Date(), responseTime: 200, uptime: 99.7 },
      { name: 'Communication Hub', status: 'Online', lastUpdate: new Date(), responseTime: 80, uptime: 99.95 }
    ];

    setActionableItems(mockItems);
    setSystemStatus(mockSystemStatus);
  };

  const handleAction = async (item: ActionableItem, actionType: string) => {
    setIsExecuting(item.id);
    
    // Simulate action execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    switch (actionType) {
      case 'execute_optimal':
        navigate('/optimization');
        break;
      case 'view_options':
        navigate('/optimization');
        break;
      case 'schedule_transfer':
        // Update item status
        setActionableItems(prev => prev.map(i => 
          i.id === item.id ? { ...i, status: 'In_Progress' as const } : i
        ));
        break;
      case 'apply_optimization':
        setActionableItems(prev => prev.map(i => 
          i.id === item.id ? { ...i, status: 'Completed' as const } : i
        ));
        break;
      default:
        console.log(`Executing action: ${actionType} for item: ${item.id}`);
    }
    
    setIsExecuting(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Critical': return 'error';
      case 'Warning': return 'warning';
      case 'Info': return 'info';
      case 'Success': return 'success';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <PendingIcon color="warning" />;
      case 'In_Progress': return <ExecuteIcon color="primary" />;
      case 'Completed': return <SuccessIcon color="success" />;
      case 'Failed': return <AlertIcon color="error" />;
      default: return <PendingIcon />;
    }
  };

  const getSystemStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return 'success';
      case 'Warning': return 'warning';
      case 'Offline': return 'error';
      case 'Maintenance': return 'info';
      default: return 'default';
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, item: ActionableItem) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Actionable Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time insights with intelligent recommendations and one-click actions
          </Typography>
        </Box>
        <Box>
          <Tooltip title="Configure Dashboard">
            <IconButton onClick={() => navigate('/configuration')}>
              <ConfigIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh Data">
            <IconButton onClick={loadDashboardData}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="outlined"
            startIcon={<TrendIcon />}
            onClick={() => navigate('/optimization')}
            sx={{ ml: 2 }}
          >
            Network Optimization
          </Button>
        </Box>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Critical Actions
                  </Typography>
                  <Typography variant="h4">
                    {actionableItems.filter(item => item.type === 'Critical' && item.status === 'Pending').length}
                  </Typography>
                </Box>
                <AlertIcon color="error" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    In Progress
                  </Typography>
                  <Typography variant="h4">
                    {actionableItems.filter(item => item.status === 'In_Progress').length}
                  </Typography>
                </Box>
                <ExecuteIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Potential Savings
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    ${Math.abs(actionableItems.filter(item => item.cost < 0).reduce((sum, item) => sum + item.cost, 0)).toLocaleString()}
                  </Typography>
                </Box>
                <TrendIcon color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    System Health
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {Math.round(systemStatus.reduce((sum, sys) => sum + sys.uptime, 0) / systemStatus.length)}%
                  </Typography>
                </Box>
                <PerformanceIcon color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Actionable Items */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Priority Actions Required
            </Typography>
            
            {actionableItems.map((item) => (
              <Card key={item.id} sx={{ mb: 2, border: item.type === 'Critical' ? 2 : 0, borderColor: 'error.main' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      {getStatusIcon(item.status)}
                      <Box sx={{ ml: 2, flex: 1 }}>
                        <Typography variant="h6" component="div">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={item.type}
                        color={getTypeColor(item.type) as any}
                        size="small"
                      />
                      <Chip
                        label={item.priority}
                        variant="outlined"
                        size="small"
                      />
                      <IconButton onClick={(e) => handleMenuOpen(e, item)}>
                        <MoreIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={3}>
                      <Typography variant="caption" color="text.secondary">
                        Estimated Time
                      </Typography>
                      <Typography variant="body2">
                        {item.estimatedTime}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="caption" color="text.secondary">
                        Cost Impact
                      </Typography>
                      <Typography variant="body2" color={item.cost < 0 ? 'success.main' : 'text.primary'}>
                        {item.cost < 0 ? '-' : ''}${Math.abs(item.cost).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="caption" color="text.secondary">
                        Impact Score
                      </Typography>
                      <Typography variant="body2">
                        {item.impactScore}/100
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="caption" color="text.secondary">
                        Due Date
                      </Typography>
                      <Typography variant="body2">
                        {item.dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </Grid>
                  </Grid>

                  {item.status === 'In_Progress' && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Execution Progress
                      </Typography>
                      <LinearProgress sx={{ mt: 1 }} />
                    </Box>
                  )}
                </CardContent>

                <CardActions>
                  {item.actions.map((action, index) => (
                    <Button
                      key={index}
                      variant={action.variant}
                      color={action.color}
                      disabled={action.disabled || isExecuting === item.id}
                      onClick={() => handleAction(item, action.action)}
                      sx={{ mr: 1 }}
                    >
                      {isExecuting === item.id && action.variant === 'contained' ? 'Executing...' : action.label}
                    </Button>
                  ))}
                </CardActions>
              </Card>
            ))}
          </Paper>
        </Grid>

        {/* System Status */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              System Status
            </Typography>
            <List>
              {systemStatus.map((system) => (
                <ListItem key={system.name}>
                  <ListItemIcon>
                    <Badge 
                      color={getSystemStatusColor(system.status) as any}
                      variant="dot"
                    >
                      <DashboardIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText
                    primary={system.name}
                    secondary={
                      <Box>
                        <Typography variant="caption" display="block">
                          Status: {system.status} | Uptime: {system.uptime}%
                        </Typography>
                        <Typography variant="caption" display="block">
                          Response: {system.responseTime}ms
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Quick Actions */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<TaskIcon />}
                  onClick={() => navigate('/oos')}
                >
                  Create New OOS Ticket
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ConfigIcon />}
                  onClick={() => navigate('/configuration')}
                >
                  Manage Configuration
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<NotificationIcon />}
                  onClick={() => navigate('/analytics')}
                >
                  View Analytics
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { console.log('View details'); handleMenuClose(); }}>
          View Details
        </MenuItem>
        <MenuItem onClick={() => { console.log('Edit item'); handleMenuClose(); }}>
          Modify
        </MenuItem>
        <MenuItem onClick={() => { console.log('Snooze item'); handleMenuClose(); }}>
          Snooze
        </MenuItem>
        <MenuItem onClick={() => { console.log('Archive item'); handleMenuClose(); }}>
          Archive
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ActionableDashboard;
