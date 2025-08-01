export interface OOSTicket {
  id: string;
  originalRequest: string;
  wholesalerId: string;
  wholesalerName: string;
  wholesalerContact?: {
    name: string;
    phone: string;
    email: string;
  };
  
  // AI-parsed data
  parsedSKU: string;
  parsedQuantity: number;
  parsedUrgency: 'Low' | 'Medium' | 'High';
  
  status: 'Created' | 'AI_Triage_Complete' | 'Inventory_Validated' | 'Resolution_Planned' | 'In_Progress' | 'Resolved' | 'Escalated';
  channel: 'portal' | 'hotline';
  priority: 'Low' | 'Medium' | 'High';
  
  validationResult?: InventoryValidation;
  resolutionPlan?: ResolutionPlan;
  
  timeline: TimelineEntry[];
  communications?: CommunicationEntry[];
  
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  resolutionTime?: number; // in minutes
}

export interface InventoryValidation {
  currentInventory: number;
  daysOfCover: number;
  incomingShipments: IncomingShipment[];
  requiresAction: boolean;
  reason: string;
}

export interface IncomingShipment {
  id: string;
  quantity: number;
  eta: string | Date;
}

export interface ResolutionPlan {
  type: 'Augment_Existing_Shipment' | 'Emergency_Shipment' | 'Forward_Shipment' | 'Cross_Dock' | 'No_Action';
  description: string;
  actions?: string[];
  cost: number;
  deliveryETA: string | Date;
  alternatives?: ResolutionPlan[];
}

export interface TimelineEntry {
  timestamp: Date | string;
  action: string;
  details: string;
  actor: 'System' | 'AI_Copilot' | 'Human_Coordinator' | 'Wholesaler';
}

export interface CommunicationEntry {
  timestamp: string | Date;
  type: 'Received' | 'Sent';
  channel: 'email' | 'sms' | 'phone' | 'portal' | 'hotline';
  message: string;
  recipient?: string;
}

export interface Wholesaler {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  servingRadius: number; // miles
  currentInventory: InventoryItem[];
}

export interface InventoryItem {
  sku: string;
  productName: string;
  currentStock: number;
  unit: string;
  daysOfCover: number;
  reorderLevel: number;
  lastUpdated: Date;
}

export interface SKUMaster {
  sku: string;
  productName: string;
  brand: string;
  packageSize: string;
  unitsPerCase: number;
  casesPerPallet: number;
  category: string;
}

export interface ShipmentTracking {
  id: string;
  wholesalerId: string;
  items: ShipmentItem[];
  status: 'Planned' | 'In_Transit' | 'Delivered' | 'Delayed';
  plannedDelivery: Date;
  actualDelivery?: Date;
  truckId: string;
  route: string[];
}

export interface ShipmentItem {
  sku: string;
  quantity: number;
  unit: string;
}

export interface AIResponse {
  success: boolean;
  confidence: number;
  parsedData: {
    sku?: string;
    quantity?: number;
    urgency?: string;
    deliveryDate?: string;
  };
  uncertainties: string[];
  suggestedClarifications?: string[];
}
