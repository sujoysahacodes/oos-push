import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Speed as SpeedIcon,
  Assignment as TicketIcon,
  CheckCircle as ResolvedIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface OOSTicket {
  id: string;
  wholesalerName: string;
  parsedSKU: string;
  parsedQuantity: number;
  status: string;
  priority: string;
  channel: string;
  createdAt: string;
  resolutionTime?: number;
}

const OOSTickets: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<OOSTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      // Mock data - replace with actual API call
      const mockTickets: OOSTicket[] = [
        {
          id: 'OOS-001',
          wholesalerName: 'Metro Beer Distributors',
          parsedSKU: 'BUD-12OZ-24PK',
          parsedQuantity: 240,
          status: 'Resolved',
          priority: 'High',
          channel: 'hotline',
          createdAt: '2025-07-30T10:30:00Z',
          resolutionTime: 15
        },
        {
          id: 'OOS-002',
          wholesalerName: 'City Wide Beverages',
          parsedSKU: 'STELLA-12OZ-24PK',
          parsedQuantity: 120,
          status: 'In_Progress',
          priority: 'Medium',
          channel: 'portal',
          createdAt: '2025-08-01T08:15:00Z'
        },
        {
          id: 'OOS-003',
          wholesalerName: 'Southwest Distributors',
          parsedSKU: 'CORONA-12OZ-24PK',
          parsedQuantity: 180,
          status: 'AI_Triage_Complete',
          priority: 'High',
          channel: 'hotline',
          createdAt: '2025-08-01T14:22:00Z'
        }
      ];
      
      setTickets(mockTickets);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'success';
      case 'In_Progress': return 'primary';
      case 'Escalated': return 'error';
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

  const handleViewTicket = (ticketId: string) => {
    navigate(`/oos/${ticketId}`);
  };

  const handleCreateTicket = () => {
    navigate('/oos/create');
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filterStatus !== 'all' && ticket.status !== filterStatus) return false;
    if (filterPriority !== 'all' && ticket.priority !== filterPriority) return false;
    return true;
  });

  const summaryStats = {
    total: tickets.length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
    inProgress: tickets.filter(t => t.status === 'In_Progress').length,
    avgResolutionTime: tickets
      .filter(t => t.resolutionTime)
      .reduce((sum, t) => sum + (t.resolutionTime || 0), 0) / 
      tickets.filter(t => t.resolutionTime).length || 0
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          OOS Ticket Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateTicket}
          size="large"
        >
          Create OOS Ticket
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TicketIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4">{summaryStats.total}</Typography>
                  <Typography color="text.secondary">Total Tickets</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ResolvedIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4">{summaryStats.resolved}</Typography>
                  <Typography color="text.secondary">Resolved</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WarningIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4">{summaryStats.inProgress}</Typography>
                  <Typography color="text.secondary">In Progress</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SpeedIcon sx={{ fontSize: 40, color: 'info.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4">{Math.round(summaryStats.avgResolutionTime)}</Typography>
                  <Typography color="text.secondary">Avg Resolution (min)</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              label="Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              fullWidth
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="In_Progress">In Progress</MenuItem>
              <MenuItem value="AI_Triage_Complete">AI Triage Complete</MenuItem>
              <MenuItem value="Escalated">Escalated</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              label="Priority"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              fullWidth
            >
              <MenuItem value="all">All Priorities</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Tickets Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ticket ID</TableCell>
              <TableCell>Wholesaler</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Channel</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Resolution Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.id} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {ticket.id}
                  </Typography>
                </TableCell>
                <TableCell>{ticket.wholesalerName}</TableCell>
                <TableCell>{ticket.parsedSKU}</TableCell>
                <TableCell>{ticket.parsedQuantity} cases</TableCell>
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
                  <Chip
                    label={ticket.channel}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {ticket.resolutionTime ? `${ticket.resolutionTime} min` : '-'}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleViewTicket(ticket.id)}
                    color="primary"
                  >
                    <ViewIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OOSTickets;
