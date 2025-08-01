import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Alert,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Assessment as AssessmentIcon,
  Schedule as ScheduleIcon,
  Inventory as InventoryIcon,
  Speed as SpeedIcon,
  MonetizationOn as MoneyIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Timeline as TimelineIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart as ShowChartIcon,
  GetApp as ExportIcon,
  Refresh as RefreshIcon,
  DateRange as DateRangeIcon
} from '@mui/icons-material';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart
} from 'recharts';

interface AnalyticsData {
  kpis: {
    totalTickets: number;
    resolvedTickets: number;
    averageResolutionTime: number;
    costImpact: number;
    uptime: number;
    customerSatisfaction: number;
  };
  trends: {
    ticketTrends: Array<{
      date: string;
      created: number;
      resolved: number;
      pending: number;
    }>;
    resolutionTimes: Array<{
      date: string;
      averageHours: number;
      target: number;
    }>;
    costImpacts: Array<{
      date: string;
      cost: number;
      savings: number;
    }>;
  };
  breakdowns: {
    ticketsByStatus: Array<{
      status: string;
      count: number;
      percentage: number;
      color: string;
    }>;
    ticketsByPriority: Array<{
      priority: string;
      count: number;
      avgResolutionTime: number;
      color: string;
    }>;
    ticketsByCategory: Array<{
      category: string;
      count: number;
      trend: number;
      color: string;
    }>;
  };
  performance: {
    topPerformingWholesalers: Array<{
      name: string;
      resolutionRate: number;
      avgTime: number;
      ticketCount: number;
    }>;
    problematicAreas: Array<{
      area: string;
      issueCount: number;
      impact: string;
      trend: number;
    }>;
  };
  forecasting: {
    demandPredictions: Array<{
      product: string;
      currentStock: number;
      predictedDemand: number;
      riskLevel: string;
    }>;
    seasonalTrends: Array<{
      month: string;
      historicalDemand: number;
      predictedDemand: number;
    }>;
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [dateRange, setDateRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [exportDialog, setExportDialog] = useState(false);

  useEffect(() => {
    loadAnalyticsData();
  }, [dateRange]);

  const loadAnalyticsData = async () => {
    setLoading(true);
    // Simulate API call with mock data
    setTimeout(() => {
      const mockData: AnalyticsData = {
        kpis: {
          totalTickets: 1247,
          resolvedTickets: 1089,
          averageResolutionTime: 4.2,
          costImpact: 187500,
          uptime: 99.7,
          customerSatisfaction: 4.6
        },
        trends: {
          ticketTrends: [
            { date: '2024-01-01', created: 45, resolved: 38, pending: 7 },
            { date: '2024-01-02', created: 52, resolved: 49, pending: 10 },
            { date: '2024-01-03', created: 38, resolved: 41, pending: 7 },
            { date: '2024-01-04', created: 61, resolved: 55, pending: 13 },
            { date: '2024-01-05', created: 44, resolved: 47, pending: 10 },
            { date: '2024-01-06', created: 37, resolved: 39, pending: 8 },
            { date: '2024-01-07', created: 49, resolved: 45, pending: 12 }
          ],
          resolutionTimes: [
            { date: '2024-01-01', averageHours: 4.2, target: 6.0 },
            { date: '2024-01-02', averageHours: 3.8, target: 6.0 },
            { date: '2024-01-03', averageHours: 5.1, target: 6.0 },
            { date: '2024-01-04', averageHours: 4.7, target: 6.0 },
            { date: '2024-01-05', averageHours: 3.9, target: 6.0 },
            { date: '2024-01-06', averageHours: 4.3, target: 6.0 },
            { date: '2024-01-07', averageHours: 4.6, target: 6.0 }
          ],
          costImpacts: [
            { date: '2024-01-01', cost: 15200, savings: 8300 },
            { date: '2024-01-02', cost: 18500, savings: 12400 },
            { date: '2024-01-03', cost: 12800, savings: 9100 },
            { date: '2024-01-04', cost: 22300, savings: 15600 },
            { date: '2024-01-05', cost: 16700, savings: 11200 },
            { date: '2024-01-06', cost: 13900, savings: 8800 },
            { date: '2024-01-07', cost: 19400, savings: 13100 }
          ]
        },
        breakdowns: {
          ticketsByStatus: [
            { status: 'Resolved', count: 1089, percentage: 87.3, color: '#4caf50' },
            { status: 'In Progress', count: 94, percentage: 7.5, color: '#ff9800' },
            { status: 'Pending', count: 45, percentage: 3.6, color: '#f44336' },
            { status: 'New', count: 19, percentage: 1.5, color: '#2196f3' }
          ],
          ticketsByPriority: [
            { priority: 'Critical', count: 67, avgResolutionTime: 2.1, color: '#f44336' },
            { priority: 'High', count: 234, avgResolutionTime: 3.4, color: '#ff9800' },
            { priority: 'Medium', count: 567, avgResolutionTime: 4.8, color: '#ffeb3b' },
            { priority: 'Low', count: 379, avgResolutionTime: 7.2, color: '#4caf50' }
          ],
          ticketsByCategory: [
            { category: 'Stock Shortage', count: 456, trend: -12, color: '#f44336' },
            { category: 'Delivery Issues', count: 298, trend: 8, color: '#ff9800' },
            { category: 'Quality Control', count: 187, trend: -5, color: '#ffeb3b' },
            { category: 'System Issues', count: 154, trend: 15, color: '#2196f3' },
            { category: 'Customer Complaints', count: 152, trend: -8, color: '#9c27b0' }
          ]
        },
        performance: {
          topPerformingWholesalers: [
            { name: 'Metro Beverage Distributors', resolutionRate: 96.5, avgTime: 3.2, ticketCount: 89 },
            { name: 'Lone Star Distributors', resolutionRate: 94.8, avgTime: 3.7, ticketCount: 76 },
            { name: 'Pacific Coast Beverages', resolutionRate: 93.1, avgTime: 4.1, ticketCount: 124 },
            { name: 'Great Lakes Beverage', resolutionRate: 76.3, avgTime: 8.2, ticketCount: 156 }
          ],
          problematicAreas: [
            { area: 'Southeast Region', issueCount: 89, impact: 'High', trend: 23 },
            { area: 'Stella Artois Distribution', issueCount: 67, impact: 'Medium', trend: 15 },
            { area: 'Weekend Delivery', issueCount: 45, impact: 'Medium', trend: -8 },
            { area: 'Rural Areas', issueCount: 34, impact: 'Low', trend: 12 }
          ]
        },
        forecasting: {
          demandPredictions: [
            { product: 'Budweiser 12oz', currentStock: 2400, predictedDemand: 3200, riskLevel: 'High' },
            { product: 'Stella Artois 12oz', currentStock: 1800, predictedDemand: 2100, riskLevel: 'Medium' },
            { product: 'Corona Extra 12oz', currentStock: 3200, predictedDemand: 2800, riskLevel: 'Low' },
            { product: 'Michelob Ultra 12oz', currentStock: 1500, predictedDemand: 2400, riskLevel: 'Critical' }
          ],
          seasonalTrends: [
            { month: 'Jan', historicalDemand: 85000, predictedDemand: 87500 },
            { month: 'Feb', historicalDemand: 78000, predictedDemand: 82000 },
            { month: 'Mar', historicalDemand: 92000, predictedDemand: 95000 },
            { month: 'Apr', historicalDemand: 105000, predictedDemand: 108000 },
            { month: 'May', historicalDemand: 125000, predictedDemand: 128000 },
            { month: 'Jun', historicalDemand: 145000, predictedDemand: 150000 }
          ]
        }
      };
      setAnalyticsData(mockData);
      setLoading(false);
    }, 1000);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getKPIIcon = (kpi: string) => {
    switch (kpi) {
      case 'tickets': return <AssessmentIcon />;
      case 'resolution': return <ScheduleIcon />;
      case 'cost': return <MoneyIcon />;
      case 'uptime': return <SpeedIcon />;
      case 'satisfaction': return <CheckCircleIcon />;
      default: return <AssessmentIcon />;
    }
  };

  const getKPIColor = (value: number, type: string) => {
    switch (type) {
      case 'percentage':
        return value >= 95 ? 'success.main' : value >= 85 ? 'warning.main' : 'error.main';
      case 'time':
        return value <= 4 ? 'success.main' : value <= 6 ? 'warning.main' : 'error.main';
      default:
        return 'primary.main';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  if (loading || !analyticsData) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Analytics Dashboard</Typography>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Analytics Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Comprehensive OOS performance analytics and business intelligence
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={dateRange}
              label="Time Range"
              onChange={(e) => setDateRange(e.target.value)}
            >
              <MenuItem value="24h">Last 24 Hours</MenuItem>
              <MenuItem value="7d">Last 7 Days</MenuItem>
              <MenuItem value="30d">Last 30 Days</MenuItem>
              <MenuItem value="90d">Last 90 Days</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={loadAnalyticsData}>
            Refresh
          </Button>
          <Button variant="contained" startIcon={<ExportIcon />} onClick={() => setExportDialog(true)}>
            Export
          </Button>
        </Box>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Tickets
                  </Typography>
                  <Typography variant="h4">
                    {analyticsData.kpis.totalTickets.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +8.2% from last period
                  </Typography>
                </Box>
                <AssessmentIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Resolution Rate
                  </Typography>
                  <Typography variant="h4" color={getKPIColor((analyticsData.kpis.resolvedTickets / analyticsData.kpis.totalTickets) * 100, 'percentage')}>
                    {((analyticsData.kpis.resolvedTickets / analyticsData.kpis.totalTickets) * 100).toFixed(1)}%
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +2.1% improvement
                  </Typography>
                </Box>
                <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Avg Resolution
                  </Typography>
                  <Typography variant="h4" color={getKPIColor(analyticsData.kpis.averageResolutionTime, 'time')}>
                    {analyticsData.kpis.averageResolutionTime}h
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    -12% faster
                  </Typography>
                </Box>
                <ScheduleIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Cost Impact
                  </Typography>
                  <Typography variant="h4">
                    ${(analyticsData.kpis.costImpact / 1000).toFixed(0)}K
                  </Typography>
                  <Typography variant="body2" color="error.main">
                    +5.3% increase
                  </Typography>
                </Box>
                <MoneyIcon color="secondary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    System Uptime
                  </Typography>
                  <Typography variant="h4" color={getKPIColor(analyticsData.kpis.uptime, 'percentage')}>
                    {analyticsData.kpis.uptime}%
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    Excellent
                  </Typography>
                </Box>
                <SpeedIcon color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Satisfaction
                  </Typography>
                  <Typography variant="h4" color="primary.main">
                    {analyticsData.kpis.customerSatisfaction}/5.0
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +0.3 improvement
                  </Typography>
                </Box>
                <CheckCircleIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Alerts */}
      {analyticsData.forecasting.demandPredictions.some(p => p.riskLevel === 'Critical') && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <strong>Critical Stock Alert:</strong> {analyticsData.forecasting.demandPredictions.filter(p => p.riskLevel === 'Critical').length} product(s) predicted to have critical shortages.
        </Alert>
      )}

      {/* Main Analytics Content */}
      <Paper sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ px: 2, pt: 2 }}>
          <Tab label="Trends & Performance" icon={<TimelineIcon />} />
          <Tab label="Breakdowns & Categories" icon={<PieChartIcon />} />
          <Tab label="Predictive Analytics" icon={<ShowChartIcon />} />
          <Tab label="Detailed Reports" icon={<BarChartIcon />} />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Card>
                <CardHeader title="Ticket Trends (Daily)" />
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={analyticsData.trends.ticketTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="created" fill="#2196f3" name="Created" />
                      <Bar dataKey="resolved" fill="#4caf50" name="Resolved" />
                      <Line type="monotone" dataKey="pending" stroke="#f44336" name="Pending" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card>
                <CardHeader title="Resolution Time Trends" />
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData.trends.resolutionTimes}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="averageHours" stroke="#2196f3" strokeWidth={2} name="Actual" />
                      <Line type="monotone" dataKey="target" stroke="#ff9800" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Cost Impact Analysis" />
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={analyticsData.trends.costImpacts}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="cost" stackId="1" stroke="#f44336" fill="#f44336" name="Cost Impact" />
                      <Area type="monotone" dataKey="savings" stackId="2" stroke="#4caf50" fill="#4caf50" name="Cost Savings" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Tickets by Status" />
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analyticsData.breakdowns.ticketsByStatus}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ status, percentage }) => `${status}: ${percentage}%`}
                      >
                        {analyticsData.breakdowns.ticketsByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Priority Distribution" />
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.breakdowns.ticketsByPriority} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="priority" type="category" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#2196f3" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Issue Categories" />
                <CardContent>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Category</TableCell>
                          <TableCell align="right">Count</TableCell>
                          <TableCell align="center">Trend</TableCell>
                          <TableCell align="center">Impact</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {analyticsData.breakdowns.ticketsByCategory.map((category) => (
                          <TableRow key={category.category}>
                            <TableCell>{category.category}</TableCell>
                            <TableCell align="right">{category.count}</TableCell>
                            <TableCell align="center">
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {category.trend > 0 ? (
                                  <TrendingUpIcon color="error" sx={{ mr: 1 }} />
                                ) : (
                                  <TrendingDownIcon color="success" sx={{ mr: 1 }} />
                                )}
                                {Math.abs(category.trend)}%
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <LinearProgress
                                variant="determinate"
                                value={Math.min((category.count / 500) * 100, 100)}
                                color={category.count > 300 ? 'error' : category.count > 200 ? 'warning' : 'success'}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Card>
                <CardHeader title="Demand Predictions" />
                <CardContent>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell align="right">Current Stock</TableCell>
                          <TableCell align="right">Predicted Demand</TableCell>
                          <TableCell align="center">Risk Level</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {analyticsData.forecasting.demandPredictions.map((prediction) => (
                          <TableRow key={prediction.product}>
                            <TableCell>{prediction.product}</TableCell>
                            <TableCell align="right">{prediction.currentStock.toLocaleString()}</TableCell>
                            <TableCell align="right">{prediction.predictedDemand.toLocaleString()}</TableCell>
                            <TableCell align="center">
                              <Chip
                                label={prediction.riskLevel}
                                color={getRiskColor(prediction.riskLevel) as any}
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card>
                <CardHeader title="Seasonal Trends" />
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData.forecasting.seasonalTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="historicalDemand" stroke="#2196f3" strokeWidth={2} name="Historical" />
                      <Line type="monotone" dataKey="predictedDemand" stroke="#4caf50" strokeWidth={2} name="Predicted" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Card>
                <CardHeader title="Top Performing Wholesalers" />
                <CardContent>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Wholesaler</TableCell>
                          <TableCell align="center">Resolution Rate</TableCell>
                          <TableCell align="center">Avg Time (hrs)</TableCell>
                          <TableCell align="right">Tickets</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {analyticsData.performance.topPerformingWholesalers.map((wholesaler) => (
                          <TableRow key={wholesaler.name}>
                            <TableCell>{wholesaler.name}</TableCell>
                            <TableCell align="center">
                              <Chip
                                label={`${wholesaler.resolutionRate}%`}
                                color={wholesaler.resolutionRate > 90 ? 'success' : wholesaler.resolutionRate > 80 ? 'warning' : 'error'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell align="center">{wholesaler.avgTime}</TableCell>
                            <TableCell align="right">{wholesaler.ticketCount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card>
                <CardHeader title="Problematic Areas" />
                <CardContent>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Area</TableCell>
                          <TableCell align="right">Issues</TableCell>
                          <TableCell align="center">Impact</TableCell>
                          <TableCell align="center">Trend</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {analyticsData.performance.problematicAreas.map((area) => (
                          <TableRow key={area.area}>
                            <TableCell>{area.area}</TableCell>
                            <TableCell align="right">{area.issueCount}</TableCell>
                            <TableCell align="center">
                              <Chip
                                label={area.impact}
                                color={area.impact === 'High' ? 'error' : area.impact === 'Medium' ? 'warning' : 'success'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {area.trend > 0 ? (
                                  <TrendingUpIcon color="error" sx={{ mr: 1 }} />
                                ) : (
                                  <TrendingDownIcon color="success" sx={{ mr: 1 }} />
                                )}
                                {Math.abs(area.trend)}%
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Export Dialog */}
      <Dialog open={exportDialog} onClose={() => setExportDialog(false)}>
        <DialogTitle>Export Analytics Report</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Select the data range and format for your analytics export:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Export Format</InputLabel>
                <Select defaultValue="pdf">
                  <MenuItem value="pdf">PDF Report</MenuItem>
                  <MenuItem value="xlsx">Excel Spreadsheet</MenuItem>
                  <MenuItem value="csv">CSV Data</MenuItem>
                  <MenuItem value="pptx">PowerPoint Presentation</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Data Range</InputLabel>
                <Select defaultValue="30d">
                  <MenuItem value="7d">Last 7 Days</MenuItem>
                  <MenuItem value="30d">Last 30 Days</MenuItem>
                  <MenuItem value="90d">Last 90 Days</MenuItem>
                  <MenuItem value="365d">Last Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setExportDialog(false)}>
            Export Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Analytics;
