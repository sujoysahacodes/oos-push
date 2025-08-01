import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Alert,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  CheckCircle as ValidIcon,
  Warning as WarningIcon,
  TrendingUp as TrendIcon,
  LocalShipping as ShippingIcon,
  Factory as FactoryIcon,
  Store as StoreIcon
} from '@mui/icons-material';

interface InventoryValidationProps {
  ticketId?: string;
  wholesalerId?: string;
  sku?: string;
  requestedQuantity?: number;
  onValidationComplete?: (result: any) => void;
}

const InventoryValidation: React.FC<InventoryValidationProps> = ({
  wholesalerId = 'WS001',
  requestedQuantity = 72,
  onValidationComplete
}) => {
  const [validationStep, setValidationStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [validationResults, setValidationResults] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  const validationSteps = [
    'Checking wholesaler inventory',
    'Querying supply chain systems',
    'Analyzing delivery schedules',
    'Evaluating nearby warehouses',
    'Calculating demand forecast',
    'Generating recommendations'
  ];

  useEffect(() => {
    performValidation();
  }, []);

  const performValidation = async () => {
    setIsProcessing(true);
    
    for (let i = 0; i < validationSteps.length; i++) {
      setValidationStep(i);
      setProgress((i / validationSteps.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Simulate comprehensive validation results
    const results = {
      wholesalerInventory: {
        currentStock: Math.floor(Math.random() * 100) + 50,
        reservedStock: Math.floor(Math.random() * 30),
        availableStock: Math.floor(Math.random() * 80) + 20,
        lastUpdated: new Date().toISOString(),
        location: getWholesalerLocation(wholesalerId)
      },
      openOrders: [
        {
          orderId: 'ORD-2025-0801-001',
          quantity: Math.floor(Math.random() * 200) + 100,
          scheduledDelivery: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
          status: 'In Transit',
          estimatedArrival: '2:00 PM'
        },
        {
          orderId: 'ORD-2025-0802-002',
          quantity: Math.floor(Math.random() * 150) + 75,
          scheduledDelivery: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
          status: 'Scheduled',
          estimatedArrival: '10:00 AM'
        }
      ],
      nearbyWarehouses: [
        {
          warehouseId: 'WH-CHI-01',
          location: 'Chicago Distribution Center',
          distance: '15 miles',
          currentStock: Math.floor(Math.random() * 500) + 200,
          availableCapacity: Math.floor(Math.random() * 300) + 100,
          lastDeliveryTime: '4 hours'
        },
        {
          warehouseId: 'WH-MIL-01',
          location: 'Milwaukee Regional Hub',
          distance: '90 miles',
          currentStock: Math.floor(Math.random() * 800) + 400,
          availableCapacity: Math.floor(Math.random() * 500) + 200,
          lastDeliveryTime: '8 hours'
        }
      ],
      productionData: {
        brewery: 'St. Louis Brewery',
        dailyProduction: Math.floor(Math.random() * 5000) + 2000,
        currentInventory: Math.floor(Math.random() * 10000) + 5000,
        plannedProduction: [
          { date: new Date().toISOString(), quantity: 2500 },
          { date: new Date(Date.now() + 86400000).toISOString(), quantity: 3000 }
        ]
      },
      demandForecast: {
        nextWeekDemand: Math.floor(Math.random() * 1000) + 500,
        seasonalTrend: 'Increasing',
        riskLevel: 'Medium',
        confidence: Math.random() * 20 + 80
      },
      validation: {
        canFulfill: Math.random() > 0.3, // 70% can fulfill
        shortfall: Math.max(0, requestedQuantity - (Math.floor(Math.random() * 80) + 20)),
        riskFactors: [] as string[],
        recommendedActions: [] as string[]
      }
    };

    // Calculate validation outcome
    const totalAvailable = results.wholesalerInventory.availableStock + 
                          results.openOrders.reduce((sum, order) => sum + order.quantity, 0);
    
    results.validation.canFulfill = totalAvailable >= requestedQuantity;
    results.validation.shortfall = Math.max(0, requestedQuantity - totalAvailable);
    
    if (!results.validation.canFulfill) {
      results.validation.riskFactors = [
        'Insufficient current inventory',
        'High demand period',
        'Limited nearby warehouse stock'
      ];
      results.validation.recommendedActions = [
        'Emergency shipment from Milwaukee hub',
        'Partial fulfillment with expedited delivery',
        'Consider alternative product substitution'
      ];
    } else {
      results.validation.recommendedActions = [
        'Standard fulfillment from existing inventory',
        'Monitor delivery schedule for on-time arrival'
      ];
    }

    setValidationResults(results);
    setProgress(100);
    setIsProcessing(false);
    onValidationComplete?.(results);
  };

  const getWholesalerLocation = (id: string) => {
    const locations: { [key: string]: string } = {
      'WH001': 'Chicago, IL',
      'WH002': 'Denver, CO',
      'WH003': 'Phoenix, AZ',
      'WH004': 'Boston, MA',
      'WH005': 'Seattle, WA'
    };
    return locations[id] || 'Unknown Location';
  };

  const getValidationIcon = () => {
    if (!validationResults) return <InventoryIcon />;
    return validationResults.validation.canFulfill ? 
      <ValidIcon color="success" /> : 
      <WarningIcon color="warning" />;
  };

  const getValidationColor = () => {
    if (!validationResults) return 'info';
    return validationResults.validation.canFulfill ? 'success' : 'warning';
  };

  if (isProcessing) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <InventoryIcon sx={{ mr: 2 }} />
            <Typography variant="h6">
              AI Inventory Validation in Progress
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {validationSteps[validationStep]}
          </Typography>
          
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ mb: 2, height: 8, borderRadius: 4 }}
          />
          
          <Typography variant="caption" color="text.secondary">
            Querying real-time inventory systems, supply chain data, and demand forecasts...
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
            {getValidationIcon()}
            <Typography variant="h6" sx={{ ml: 2 }}>
              Inventory Validation Complete
            </Typography>
          </Box>
          
          <Alert 
            severity={getValidationColor() as any} 
            sx={{ mb: 2 }}
          >
            {validationResults.validation.canFulfill ? 
              `✓ Request can be fulfilled. Total available: ${validationResults.wholesalerInventory.availableStock + validationResults.openOrders.reduce((sum: number, order: any) => sum + order.quantity, 0)} cases` :
              `⚠ Shortfall detected: ${validationResults.validation.shortfall} cases short of ${requestedQuantity} requested`
            }
          </Alert>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Current Inventory */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <StoreIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Wholesaler Inventory</Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h4" color="primary">
                    {validationResults.wholesalerInventory.currentStock}
                  </Typography>
                  <Typography variant="caption">Current Stock</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h4" color="warning.main">
                    {validationResults.wholesalerInventory.reservedStock}
                  </Typography>
                  <Typography variant="caption">Reserved</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h4" color="success.main">
                    {validationResults.wholesalerInventory.availableStock}
                  </Typography>
                  <Typography variant="caption">Available</Typography>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Location: {validationResults.wholesalerInventory.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last Updated: {new Date(validationResults.wholesalerInventory.lastUpdated).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Scheduled Deliveries */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShippingIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Scheduled Deliveries</Typography>
              </Box>
              
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Arrival</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {validationResults.openOrders.map((order: any) => (
                      <TableRow key={order.orderId}>
                        <TableCell>{order.orderId}</TableCell>
                        <TableCell>{order.quantity} cases</TableCell>
                        <TableCell>
                          {new Date(order.scheduledDelivery).toLocaleDateString()}<br/>
                          <Typography variant="caption">{order.estimatedArrival}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={order.status} 
                            color={order.status === 'In Transit' ? 'primary' : 'default'}
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

        {/* Nearby Warehouses */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <InventoryIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Nearby Warehouses</Typography>
              </Box>
              
              {validationResults.nearbyWarehouses.map((warehouse: any) => (
                <Box key={warehouse.warehouseId} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="subtitle2">{warehouse.location}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {warehouse.distance} • {warehouse.currentStock} cases available • {warehouse.lastDeliveryTime} delivery
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Production & Demand */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FactoryIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Production & Demand</Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Production</Typography>
                  <Typography variant="body2">
                    Daily: {validationResults.productionData.dailyProduction} cases
                  </Typography>
                  <Typography variant="body2">
                    Inventory: {validationResults.productionData.currentInventory} cases
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Demand Forecast</Typography>
                  <Typography variant="body2">
                    Next Week: {validationResults.demandForecast.nextWeekDemand} cases
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TrendIcon fontSize="small" />
                    <Typography variant="body2">
                      {validationResults.demandForecast.seasonalTrend}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                AI Recommendations
              </Typography>
              
              {validationResults.validation.riskFactors.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="warning.main" gutterBottom>
                    Risk Factors:
                  </Typography>
                  {validationResults.validation.riskFactors.map((risk: string, idx: number) => (
                    <Alert key={idx} severity="warning" sx={{ mb: 1 }}>
                      {risk}
                    </Alert>
                  ))}
                </Box>
              )}
              
              <Typography variant="subtitle2" gutterBottom>
                Recommended Actions:
              </Typography>
              {validationResults.validation.recommendedActions.map((action: string, idx: number) => (
                <Alert key={idx} severity="info" sx={{ mb: 1 }}>
                  {action}
                </Alert>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InventoryValidation;
