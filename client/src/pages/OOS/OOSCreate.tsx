import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Chip,
  Divider
} from '@mui/material';
import {
  Send as SendIcon,
  ArrowBack as BackIcon,
  SmartToy as AIIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const OOSCreate: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    wholesalerId: '',
    channel: 'portal',
    description: '',
    urgency: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });
  
  const [aiParsing, setAiParsing] = useState({
    isProcessing: false,
    results: null as any,
    confidence: 0
  });

  const steps = ['Request Details', 'AI Processing', 'Review & Submit'];

  const wholesalers = [
    { id: 'WH001', name: 'Metro Beer Distributors', location: 'Chicago, IL' },
    { id: 'WH002', name: 'City Wide Beverages', location: 'Denver, CO' },
    { id: 'WH003', name: 'Southwest Distributors', location: 'Phoenix, AZ' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Trigger AI parsing when description changes
    if (field === 'description' && value.length > 10) {
      triggerAIParsing(value);
    }
  };

  const triggerAIParsing = async (description: string) => {
    setAiParsing(prev => ({ ...prev, isProcessing: true }));
    
    // Mock AI parsing - in real implementation, call AI service
    setTimeout(() => {
      const mockResults = {
        parsedSKU: extractSKUFromText(description),
        parsedQuantity: extractQuantityFromText(description),
        parsedUrgency: extractUrgencyFromText(description),
        confidence: Math.random() * 30 + 70, // 70-100%
        suggestions: [
          'Consider specifying exact delivery date if urgent',
          'Verify SKU code for accuracy'
        ]
      };
      
      setAiParsing({
        isProcessing: false,
        results: mockResults,
        confidence: mockResults.confidence
      });
    }, 2000);
  };

  const extractSKUFromText = (text: string): string => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('budweiser') || lowerText.includes('bud')) return 'BUD-12OZ-24PK';
    if (lowerText.includes('stella')) return 'STELLA-12OZ-24PK';
    if (lowerText.includes('corona')) return 'CORONA-12OZ-24PK';
    return 'UNKNOWN-SKU';
  };

  const extractQuantityFromText = (text: string): number => {
    const palletMatch = text.match(/(\d+)\s*pallets?/i);
    if (palletMatch) return parseInt(palletMatch[1]) * 24;
    
    const caseMatch = text.match(/(\d+)\s*cases?/i);
    if (caseMatch) return parseInt(caseMatch[1]);
    
    return 0;
  };

  const extractUrgencyFromText = (text: string): string => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('asap') || lowerText.includes('urgent')) return 'High';
    if (lowerText.includes('soon')) return 'Medium';
    return 'Low';
  };

  const handleNext = () => {
    if (activeStep === 0 && formData.description) {
      setActiveStep(1);
    } else if (activeStep === 1 && aiParsing.results) {
      setActiveStep(2);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    } else {
      navigate('/oos');
    }
  };

  const handleSubmit = async () => {
    try {
      // Mock API call - replace with actual submission
      const ticketData = {
        ...formData,
        parsedData: aiParsing.results,
        timestamp: new Date().toISOString()
      };
      
      console.log('Submitting ticket:', ticketData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to tickets list
      navigate('/oos');
    } catch (error) {
      console.error('Failed to create ticket:', error);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Wholesaler"
                value={formData.wholesalerId}
                onChange={(e) => handleInputChange('wholesalerId', e.target.value)}
                fullWidth
                required
              >
                {wholesalers.map((wholesaler) => (
                  <MenuItem key={wholesaler.id} value={wholesaler.id}>
                    {wholesaler.name} - {wholesaler.location}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Channel"
                value={formData.channel}
                onChange={(e) => handleInputChange('channel', e.target.value)}
                fullWidth
                required
              >
                <MenuItem value="portal">Portal Request</MenuItem>
                <MenuItem value="hotline">Hotline Call</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="OOS Request Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                multiline
                rows={4}
                fullWidth
                required
                placeholder="Describe the out-of-stock situation (e.g., 'Need 10 pallets of Budweiser ASAP', 'Running low on Stella Artois, about 3 days left')"
                helperText="AI will automatically parse your request to identify SKU, quantity, and urgency"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Contact Name"
                value={formData.contactName}
                onChange={(e) => handleInputChange('contactName', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Contact Phone"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Contact Email"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                fullWidth
                type="email"
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AIIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography variant="h5">AI Processing Results</Typography>
            </Box>
            
            {aiParsing.isProcessing ? (
              <Alert severity="info">
                AI Copilot is analyzing your request... This may take a few seconds.
              </Alert>
            ) : aiParsing.results ? (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Alert severity="success">
                    AI parsing completed with {Math.round(aiParsing.confidence)}% confidence
                  </Alert>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Parsed Information</Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">SKU Identified:</Typography>
                        <Chip label={aiParsing.results.parsedSKU} color="primary" />
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">Quantity:</Typography>
                        <Typography variant="body1">{aiParsing.results.parsedQuantity} cases</Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">Urgency Level:</Typography>
                        <Chip 
                          label={aiParsing.results.parsedUrgency} 
                          color={aiParsing.results.parsedUrgency === 'High' ? 'error' : 'warning'} 
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>AI Suggestions</Typography>
                      {aiParsing.results.suggestions.map((suggestion: string, index: number) => (
                        <Alert key={index} severity="info" sx={{ mb: 1 }}>
                          {suggestion}
                        </Alert>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            ) : null}
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>Review & Submit</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Request Details</Typography>
                    <Typography><strong>Wholesaler:</strong> {wholesalers.find(w => w.id === formData.wholesalerId)?.name}</Typography>
                    <Typography><strong>Channel:</strong> {formData.channel}</Typography>
                    <Typography><strong>Contact:</strong> {formData.contactName}</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" color="text.secondary">Original Request:</Typography>
                    <Typography variant="body1">"{formData.description}"</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>AI Parsed Data</Typography>
                    <Typography><strong>SKU:</strong> {aiParsing.results?.parsedSKU}</Typography>
                    <Typography><strong>Quantity:</strong> {aiParsing.results?.parsedQuantity} cases</Typography>
                    <Typography><strong>Urgency:</strong> {aiParsing.results?.parsedUrgency}</Typography>
                    <Typography><strong>Confidence:</strong> {Math.round(aiParsing.confidence)}%</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<BackIcon />}
          onClick={handleBack}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" component="h1">
          Create OOS Ticket
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent()}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          {activeStep === 2 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              startIcon={<SendIcon />}
              size="large"
            >
              Submit Ticket
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={
                (activeStep === 0 && !formData.description) ||
                (activeStep === 1 && !aiParsing.results)
              }
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default OOSCreate;
