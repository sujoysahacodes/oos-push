import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from '@mui/material';
import {
  Send as SendIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  Web as WebIcon,
  SmartToy as AIIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DigitalIntake: React.FC = () => {
  const navigate = useNavigate();
  const [intakeMethod, setIntakeMethod] = useState('portal');
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    wholesalerId: '',
    sku: null as any,
    quantity: '',
    urgency: '',
    description: '',
    contactName: '',
    contactPhone: '',
    preferredDeliveryDate: '',
    reason: ''
  });
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const intakeMethods = [
    { value: 'portal', label: 'Web Portal', icon: <WebIcon />, description: 'Self-service online form' },
    { value: 'chatbot', label: 'AI Chatbot', icon: <ChatIcon />, description: 'Natural language conversation' },
    { value: 'phone', label: 'Phone Support', icon: <PhoneIcon />, description: 'Assisted by support agent' }
  ];

  const wholesalers = [
    { id: 'WH001', name: 'Metro Beer Distributors', location: 'Chicago, IL' },
    { id: 'WH002', name: 'City Wide Beverages', location: 'Denver, CO' },
    { id: 'WH003', name: 'Southwest Distributors', location: 'Phoenix, AZ' },
    { id: 'WH004', name: 'Northeast Distribution', location: 'Boston, MA' },
    { id: 'WH005', name: 'Pacific Coast Beverage', location: 'Seattle, WA' }
  ];

  const skuOptions = [
    { code: 'BUD-12OZ-24PK', name: 'Budweiser 12oz 24-pack', category: 'Beer' },
    { code: 'STELLA-12OZ-24PK', name: 'Stella Artois 12oz 24-pack', category: 'Beer' },
    { code: 'CORONA-12OZ-24PK', name: 'Corona Extra 12oz 24-pack', category: 'Beer' },
    { code: 'MICHELOB-12OZ-24PK', name: 'Michelob Ultra 12oz 24-pack', category: 'Beer' },
    { code: 'NATURAL-12OZ-30PK', name: 'Natural Light 12oz 30-pack', category: 'Beer' }
  ];

  const steps = ['Select Method', 'Enter Details', 'AI Validation', 'Submit'];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleChatbotSubmit = () => {
    if (!currentMessage.trim()) return;

    const userMessage = { type: 'user', content: currentMessage, timestamp: new Date() };
    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI parsing and response
    setTimeout(() => {
      const aiResponse = generateAIResponse(currentMessage);
      setChatMessages(prev => [...prev, aiResponse]);
      
      // Auto-fill form if AI extracted data
      if (aiResponse.extractedData) {
        setFormData(prev => ({ ...prev, ...aiResponse.extractedData }));
      }
    }, 1000);

    setCurrentMessage('');
  };

  const generateAIResponse = (message: string) => {
    const lowerMsg = message.toLowerCase();
    let response = "I understand you need assistance with an out-of-stock situation. ";
    let extractedData: any = {};

    // Simple NLP simulation
    if (lowerMsg.includes('budweiser') || lowerMsg.includes('bud')) {
      extractedData.sku = skuOptions.find(s => s.code === 'BUD-12OZ-24PK');
      response += "I see you're looking for Budweiser 12oz 24-packs. ";
    }
    
    if (lowerMsg.includes('stella')) {
      extractedData.sku = skuOptions.find(s => s.code === 'STELLA-12OZ-24PK');
      response += "I see you need Stella Artois 12oz 24-packs. ";
    }

    // Extract quantity
    const quantityMatch = message.match(/(\d+)\s*(cases?|pallets?|units?)/i);
    if (quantityMatch) {
      const qty = parseInt(quantityMatch[1]);
      const unit = quantityMatch[2].toLowerCase();
      if (unit.includes('pallet')) {
        extractedData.quantity = (qty * 24).toString(); // Convert pallets to cases
        response += `That's ${qty} pallets (${qty * 24} cases). `;
      } else {
        extractedData.quantity = qty.toString();
        response += `That's ${qty} cases. `;
      }
    }

    // Extract urgency
    if (lowerMsg.includes('urgent') || lowerMsg.includes('asap') || lowerMsg.includes('immediately')) {
      extractedData.urgency = 'High';
      response += "I understand this is urgent. ";
    } else if (lowerMsg.includes('soon') || lowerMsg.includes('today') || lowerMsg.includes('tomorrow')) {
      extractedData.urgency = 'Medium';
      response += "I see this is needed soon. ";
    }

    response += "Let me help you create an OOS ticket with this information. Please review and complete any missing details.";

    return {
      type: 'ai',
      content: response,
      timestamp: new Date(),
      extractedData: Object.keys(extractedData).length > 0 ? extractedData : null
    };
  };

  const handleSubmit = async () => {
    try {
      // Create OOS ticket via API
      const ticketData = {
        ...formData,
        intakeMethod,
        status: 'AI_Triage_Pending',
        createdAt: new Date().toISOString()
      };

      // Simulate API call
      console.log('Creating OOS ticket:', ticketData);
      
      // Navigate to ticket details
      navigate('/oos/OOS-NEW-001');
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const renderMethodSelection = () => (
    <Grid container spacing={3}>
      {intakeMethods.map((method) => (
        <Grid item xs={12} md={4} key={method.value}>
          <Card 
            sx={{ 
              cursor: 'pointer',
              border: intakeMethod === method.value ? 2 : 1,
              borderColor: intakeMethod === method.value ? 'primary.main' : 'grey.300'
            }}
            onClick={() => setIntakeMethod(method.value)}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Box sx={{ fontSize: 48, color: 'primary.main', mb: 2 }}>
                {method.icon}
              </Box>
              <Typography variant="h6" gutterBottom>
                {method.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {method.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderFormFields = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Wholesaler</InputLabel>
          <Select
            value={formData.wholesalerId}
            onChange={(e) => handleInputChange('wholesalerId', e.target.value)}
          >
            {wholesalers.map((wholesaler) => (
              <MenuItem key={wholesaler.id} value={wholesaler.id}>
                {wholesaler.name} - {wholesaler.location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <Autocomplete
          options={skuOptions}
          getOptionLabel={(option) => `${option.code} - ${option.name}`}
          value={formData.sku}
          onChange={(_, value) => handleInputChange('sku', value)}
          renderInput={(params) => (
            <TextField {...params} label="Product SKU" fullWidth />
          )}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Quantity (Cases)"
          type="number"
          value={formData.quantity}
          onChange={(e) => handleInputChange('quantity', e.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel>Urgency</InputLabel>
          <Select
            value={formData.urgency}
            onChange={(e) => handleInputChange('urgency', e.target.value)}
          >
            <MenuItem value="Low">Low - Within a week</MenuItem>
            <MenuItem value="Medium">Medium - Within 2-3 days</MenuItem>
            <MenuItem value="High">High - Within 24 hours</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Preferred Delivery Date"
          type="date"
          value={formData.preferredDeliveryDate}
          onChange={(e) => handleInputChange('preferredDeliveryDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Additional Details / Reason"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="e.g., Promotional event this weekend, multiple retail locations affected..."
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Contact Name"
          value={formData.contactName}
          onChange={(e) => handleInputChange('contactName', e.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Contact Phone"
          value={formData.contactPhone}
          onChange={(e) => handleInputChange('contactPhone', e.target.value)}
        />
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Unified Digital Intake
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Single interface for all OOS reporting - Portal, Chatbot, or Phone Support
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Choose Your Preferred Intake Method
            </Typography>
            {renderMethodSelection()}
            
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => {
                  if (intakeMethod === 'chatbot') {
                    setShowChatbot(true);
                  } else {
                    setActiveStep(1);
                  }
                }}
                disabled={!intakeMethod}
              >
                Continue
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Enter OOS Request Details
            </Typography>
            {intakeMethod === 'phone' && (
              <Alert severity="info" sx={{ mb: 3 }}>
                <strong>Phone Support Mode:</strong> Support agent is filling this form based on your call.
              </Alert>
            )}
            {renderFormFields()}
            
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button onClick={() => setActiveStep(0)}>
                Back
              </Button>
              <Button
                variant="contained"
                onClick={() => setActiveStep(2)}
                disabled={!formData.wholesalerId || !formData.sku || !formData.quantity}
              >
                Continue to AI Validation
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              AI Validation & Processing
            </Typography>
            <Alert severity="info" icon={<AIIcon />} sx={{ mb: 3 }}>
              AI Copilot is validating your request and checking inventory levels...
            </Alert>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>Request Summary</Typography>
                    <Typography><strong>Wholesaler:</strong> {wholesalers.find(w => w.id === formData.wholesalerId)?.name}</Typography>
                    <Typography><strong>Product:</strong> {formData.sku?.name}</Typography>
                    <Typography><strong>Quantity:</strong> {formData.quantity} cases</Typography>
                    <Typography><strong>Urgency:</strong> {formData.urgency}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>AI Analysis</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <Chip label="SKU Validated ✓" color="success" size="small" />
                      <Chip label="Inventory Checked ✓" color="success" size="small" />
                    </Box>
                    <Typography variant="body2">
                      Current stock: 145 cases available<br/>
                      Next delivery: Tomorrow 2:00 PM<br/>
                      Recommendation: Process immediately
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button onClick={() => setActiveStep(1)}>
                Back
              </Button>
              <Button
                variant="contained"
                onClick={() => setActiveStep(3)}
              >
                Proceed to Submit
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 3 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Submit OOS Ticket
            </Typography>
            <Alert severity="success" sx={{ mb: 3 }}>
              Your request has been validated and is ready for submission. The AI Copilot will immediately begin processing your ticket.
            </Alert>
            
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button onClick={() => setActiveStep(2)}>
                Back
              </Button>
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={handleSubmit}
                size="large"
              >
                Submit OOS Request
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Chatbot Dialog */}
      <Dialog
        open={showChatbot}
        onClose={() => setShowChatbot(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AIIcon sx={{ mr: 1 }} />
            AI Chatbot - OOS Request Assistant
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ height: 400, overflowY: 'auto', mb: 2, p: 1 }}>
            {chatMessages.length === 0 && (
              <Alert severity="info">
                Hi! I'm your AI assistant. Describe your out-of-stock situation in natural language, and I'll help you create a ticket. 
                For example: "We need 15 cases of Budweiser urgently for our Chicago stores"
              </Alert>
            )}
            {chatMessages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: msg.type === 'user' ? 'primary.light' : 'grey.100',
                  ml: msg.type === 'user' ? 4 : 0,
                  mr: msg.type === 'user' ? 0 : 4
                }}
              >
                <Typography variant="body2">
                  <strong>{msg.type === 'user' ? 'You' : 'AI Assistant'}:</strong> {msg.content}
                </Typography>
              </Box>
            ))}
          </Box>
          <TextField
            fullWidth
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Describe your OOS situation..."
            onKeyPress={(e) => e.key === 'Enter' && handleChatbotSubmit()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowChatbot(false)}>Close</Button>
          <Button onClick={handleChatbotSubmit} variant="contained">Send</Button>
          <Button 
            onClick={() => {
              setShowChatbot(false);
              setActiveStep(1);
            }}
            variant="outlined"
          >
            Continue to Form
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DigitalIntake;
