import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  Speed as SpeedIcon,
  Assignment as TicketIcon,
  CheckCircle as ResolvedIcon,
  Warning as WarningIcon,
  SmartToy as AIIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTickets: 0,
    resolvedToday: 0,
    avgResolutionTime: 0,
    aiAccuracy: 0,
    activeTickets: 0,
    criticalTickets: 0
  });

  const [recentTickets, setRecentTickets] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalTickets: 247,
      resolvedToday: 23,
      avgResolutionTime: 18, // minutes
      aiAccuracy: 94.3,
      activeTickets: 12,
      criticalTickets: 3
    });

    setRecentTickets([
      {
        id: 'OOS-001',
        wholesaler: 'Metro Beer Distributors',
        sku: 'BUD-12OZ-24PK',
        status: 'Resolved',
        priority: 'High',
        createdAt: '2025-08-01T07:30:00Z',
        resolutionTime: 15
      },
      {
        id: 'OOS-002',
        wholesaler: 'City Wide Beverages',
        sku: 'STELLA-12OZ-24PK',
        status: 'In_Progress',
        priority: 'Medium',
        createdAt: '2025-08-01T08:15:00Z'
      },
      {
        id: 'OOS-003',
        wholesaler: 'Southwest Distributors',
        sku: 'CORONA-12OZ-24PK',
        status: 'AI_Triage_Complete',
        priority: 'High',
        createdAt: '2025-08-01T09:22:00Z'
      }
    ] as any);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'success';
      case 'In_Progress': return 'primary';
      case 'AI_Triage_Complete': return 'info';
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

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            OOS Copilot Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome back, {user?.name || 'User'}! Here's your out-of-stock management overview.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/oos/create')}
          size="large"
        >
          Create OOS Ticket
        </Button>
      </Box>

      {/* AI Status Alert */}
      <Alert 
        severity="success" 
        icon={<AIIcon />}
        sx={{ mb: 3 }}
      >
        AI Copilot is operational with {stats.aiAccuracy}% accuracy. Processing tickets automatically 24/7.
      </Alert>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TicketIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4">{stats.totalTickets}</Typography>
                  <Typography color="text.secondary">Total Tickets</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ResolvedIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4">{stats.resolvedToday}</Typography>
                  <Typography color="text.secondary">Resolved Today</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SpeedIcon sx={{ fontSize: 40, color: 'info.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4">{stats.avgResolutionTime}m</Typography>
                  <Typography color="text.secondary">Avg Resolution Time</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WarningIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4">{stats.criticalTickets}</Typography>
                  <Typography color="text.secondary">Critical Tickets</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* AI Performance */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                AI Copilot Performance
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Parsing Accuracy</Typography>
                  <Typography variant="body2">{stats.aiAccuracy}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={stats.aiAccuracy} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Auto-Resolution Rate</Typography>
                  <Typography variant="body2">87%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={87} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">System Uptime</Typography>
                  <Typography variant="body2">99.9%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={99.9} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/oos/create')}
                  fullWidth
                >
                  Create New OOS Ticket
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<TicketIcon />}
                  onClick={() => navigate('/oos')}
                  fullWidth
                >
                  View All Tickets
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<TrendingUpIcon />}
                  onClick={() => navigate('/analytics')}
                  fullWidth
                >
                  View Analytics
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Tickets */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Recent OOS Tickets
            </Typography>
            <Button
              variant="text"
              onClick={() => navigate('/oos')}
            >
              View All
            </Button>
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ticket ID</TableCell>
                  <TableCell>Wholesaler</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Resolution Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentTickets.map((ticket: any) => (
                  <TableRow 
                    key={ticket.id} 
                    hover 
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/oos/${ticket.id}`)}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {ticket.id}
                      </Typography>
                    </TableCell>
                    <TableCell>{ticket.wholesaler}</TableCell>
                    <TableCell>{ticket.sku}</TableCell>
                    <TableCell>
                      <Chip
                        label={ticket.status.replace('_', ' ')}
                        color={getStatusColor(ticket.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={ticket.priority}
                        color={getPriorityColor(ticket.priority) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(ticket.createdAt).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      {ticket.resolutionTime ? `${ticket.resolutionTime} min` : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
