import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Chip,
  Paper,
  Grid
} from '@mui/material';
import {
  Psychology as AIIcon,
  CheckCircle as CheckIcon,
  Schedule as ProcessingIcon,
  Assignment as ParseIcon,
  Inventory as InventoryIcon,
  LocalShipping as PlanIcon
} from '@mui/icons-material';

interface AIProcessingProps {
  requestText: string;
  onComplete: (results: any) => void;
  isProcessing: boolean;
}

const AIProcessing: React.FC<AIProcessingProps> = ({ 
  requestText, 
  onComplete, 
  isProcessing 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stepResults, setStepResults] = useState<any[]>([]);

  const processingSteps = [
    {
      label: 'Natural Language Processing',
      description: 'Analyzing request text and extracting key information',
      icon: <ParseIcon />,
      duration: 2000
    },
    {
      label: 'Data Extraction & Validation',
      description: 'Identifying SKUs, quantities, and business context',
      icon: <AIIcon />,
      duration: 1500
    },
    {
      label: 'Inventory Cross-Reference',
      description: 'Checking real-time inventory levels and availability',
      icon: <InventoryIcon />,
      duration: 1000
    },
    {
      label: 'Resolution Planning',
      description: 'Generating optimized fulfillment strategy',
      icon: <PlanIcon />,
      duration: 1500
    }
  ];

  useEffect(() => {
    if (!isProcessing) return;

    const processSteps = async () => {
      for (let i = 0; i < processingSteps.length; i++) {
        setCurrentStep(i);
        
        // Simulate processing time
        const startTime = Date.now();
        const duration = processingSteps[i].duration;
        
        const progressInterval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const stepProgress = Math.min((elapsed / duration) * 100, 100);
          setProgress((i * 100 + stepProgress) / processingSteps.length);
        }, 50);

        await new Promise(resolve => setTimeout(resolve, duration));
        clearInterval(progressInterval);

        // Add step result
        const stepResult = generateStepResult(i, requestText);
        setStepResults(prev => [...prev, stepResult]);
      }

      // Complete processing
      const finalResults = generateFinalResults(requestText);
      onComplete(finalResults);
    };

    processSteps();
  }, [isProcessing, requestText]);

  const generateStepResult = (stepIndex: number, text: string) => {
    switch (stepIndex) {
      case 0: // NLP
        return {
          step: 'NLP',
          confidence: Math.random() * 15 + 85, // 85-100%
          extractedEntities: extractEntities(text),
          sentiment: 'urgent',
          keyPhrases: extractKeyPhrases(text)
        };
      case 1: // Data Extraction
        return {
          step: 'Extraction',
          parsedSKU: extractSKU(text),
          parsedQuantity: extractQuantity(text),
          urgencyLevel: extractUrgency(text),
          wholesalerContext: extractWholesalerInfo(text)
        };
      case 2: // Inventory Check
        return {
          step: 'Inventory',
          currentStock: Math.floor(Math.random() * 500) + 100,
          nearbyWarehouses: [
            { location: 'Chicago', stock: Math.floor(Math.random() * 300) + 200 },
            { location: 'Milwaukee', stock: Math.floor(Math.random() * 400) + 150 }
          ],
          alternativeProducts: generateAlternatives()
        };
      case 3: // Planning
        return {
          step: 'Planning',
          strategy: 'Multi-source fulfillment',
          estimatedTime: '18 minutes',
          confidence: Math.random() * 10 + 90, // 90-100%
          riskFactors: ['Weekend logistics', 'High demand period']
        };
      default:
        return {};
    }
  };

  const extractEntities = (text: string) => {
    const entities = [];
    if (text.toLowerCase().includes('budweiser') || text.toLowerCase().includes('bud')) {
      entities.push({ type: 'PRODUCT', value: 'Budweiser', confidence: 0.95 });
    }
    if (text.match(/\d+\s*(pallets?|cases?)/i)) {
      entities.push({ type: 'QUANTITY', value: text.match(/\d+\s*(pallets?|cases?)/i)?.[0], confidence: 0.92 });
    }
    if (text.toLowerCase().includes('urgent') || text.toLowerCase().includes('asap')) {
      entities.push({ type: 'URGENCY', value: 'High', confidence: 0.88 });
    }
    return entities;
  };

  const extractKeyPhrases = (_text: string) => {
    return [
      'out-of-stock situation',
      'immediate resolution',
      'promotional event',
      'weekend demand'
    ];
  };

  const extractSKU = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('budweiser') || lowerText.includes('bud')) return 'BUD-12OZ-24PK';
    if (lowerText.includes('stella')) return 'STELLA-12OZ-24PK';
    if (lowerText.includes('corona')) return 'CORONA-12OZ-24PK';
    return 'BUD-12OZ-24PK'; // default for demo
  };

  const extractQuantity = (text: string) => {
    const palletMatch = text.match(/(\d+)\s*pallets?/i);
    if (palletMatch) return parseInt(palletMatch[1]) * 24;
    
    const caseMatch = text.match(/(\d+)\s*cases?/i);
    if (caseMatch) return parseInt(caseMatch[1]);
    
    return 240; // default for demo
  };

  const extractUrgency = (text: string) => {
    if (text.toLowerCase().includes('urgent') || text.toLowerCase().includes('asap')) return 'High';
    if (text.toLowerCase().includes('soon') || text.toLowerCase().includes('needed')) return 'Medium';
    return 'Medium';
  };

  const extractWholesalerInfo = (text: string) => {
    // Mock extraction
    return {
      hasContact: text.includes('@'),
      hasLocation: text.toLowerCase().includes('chicago') || text.toLowerCase().includes('metro'),
      contextClues: ['metro area', 'multiple locations']
    };
  };

  const generateAlternatives = () => [
    { sku: 'BUD-16OZ-24PK', stock: 150, conversionFactor: 0.75 },
    { sku: 'BUD-12OZ-12PK', stock: 300, conversionFactor: 2.0 }
  ];

  const generateFinalResults = (text: string) => ({
    confidence: 94.3,
    parsedData: {
      sku: extractSKU(text),
      quantity: extractQuantity(text),
      urgency: extractUrgency(text),
      productName: 'Budweiser 12oz 24-pack'
    },
    insights: [
      'High-priority request with promotional event timing',
      'Multi-location impact requiring coordinated response',
      'Alternative fulfillment options available'
    ],
    recommendations: [
      'Expedite logistics due to weekend event',
      'Consider partial fulfillment with alternatives',
      'Proactive communication with retail partners'
    ]
  });

  if (!isProcessing) {
    return null;
  }

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AIIcon sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h6">
            AI Copilot Processing
          </Typography>
        </Box>

        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ mb: 3, height: 8, borderRadius: 4 }}
        />

        <Stepper activeStep={currentStep} orientation="vertical">
          {processingSteps.map((step, index) => (
            <Step key={index}>
              <StepLabel 
                StepIconComponent={() => 
                  index < currentStep ? <CheckIcon color="success" /> :
                  index === currentStep ? <ProcessingIcon color="primary" /> :
                  step.icon
                }
              >
                <Typography variant="subtitle1">
                  {step.label}
                </Typography>
              </StepLabel>
              <Box sx={{ pb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
                
                {/* Show results for completed steps */}
                {stepResults[index] && (
                  <Paper sx={{ p: 2, mt: 1, bgcolor: 'grey.50' }}>
                    {index === 0 && stepResults[index].extractedEntities && (
                      <Box>
                        <Typography variant="caption" display="block" gutterBottom>
                          Extracted Entities:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {stepResults[index].extractedEntities.map((entity: any, idx: number) => (
                            <Chip 
                              key={idx}
                              label={`${entity.type}: ${entity.value}`}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                    
                    {index === 1 && (
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="caption">Parsed SKU:</Typography>
                          <Typography variant="body2">{stepResults[index].parsedSKU}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption">Quantity:</Typography>
                          <Typography variant="body2">{stepResults[index].parsedQuantity} cases</Typography>
                        </Grid>
                      </Grid>
                    )}
                    
                    {index === 2 && (
                      <Box>
                        <Typography variant="caption" display="block">
                          Current Stock: {stepResults[index].currentStock} cases
                        </Typography>
                        <Typography variant="caption" display="block">
                          Nearby Warehouses Available
                        </Typography>
                      </Box>
                    )}
                    
                    {index === 3 && (
                      <Box>
                        <Typography variant="caption" display="block">
                          Strategy: {stepResults[index].strategy}
                        </Typography>
                        <Typography variant="caption" display="block">
                          ETA: {stepResults[index].estimatedTime}
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                )}
              </Box>
            </Step>
          ))}
        </Stepper>

        {currentStep >= processingSteps.length && (
          <Alert severity="success" sx={{ mt: 2 }}>
            AI analysis complete! Resolution plan generated with high confidence.
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default AIProcessing;
