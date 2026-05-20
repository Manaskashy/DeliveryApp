import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';

// Dummy data for the screen
const orderData = {
  restaurantName: 'Eat Healthy',
  deliveryAddress: 'Flat no: 301, SVR Enclave, Hyper Nagar, vasavi...',
  deliveryTime: '42 mins',
  item: {
    name: 'Plant Protien Bowl',
    price: 279,
    addOn: 'Mushroom',
    isVeg: true,
    quantity: 1,
  },
  offers: {
    selectedPromoCode: null, // or 'ZOMSAFETY'
    savingsText: 'Save ₹59.70 with code ZOMSAFETY',
  },
  billDetails: {
    itemTotal: 279.00,
    deliveryCharge: 50.00,
    taxes: 5.00,
    donation: 3.00, // Can be toggled
  },
  userDetails: {
    name: 'Divya Sigatapu',
    phone: '9109109109',
  },
};

const tipOptions = [
  { amount: 20, iconName: 'bottle-soda-classic-outline', label: '₹20' },
  { amount: 30, iconName: 'cupcake', label: '₹30', subLabel: 'MOST TIPPED' },
  { amount: 50, iconName: 'doughnut', label: '₹50' },
  { amount: 0, iconName: 'gift-outline', label: 'Custom' }, // 0 means custom input
];

const CheckoutScreen = ({ navigation }: { navigation: any }) => { // Assuming navigation is passed for back/close
  const [itemQuantity, setItemQuantity] = useState(orderData.item.quantity);
  const [selectedTip, setSelectedTip] = useState(null); // Can be amount or 'custom'
  const [customTipAmount, setCustomTipAmount] = useState('');
  const [isCovidEmergency, setIsCovidEmergency] = useState(false);
  const [addDonation, setAddDonation] = useState(true); // For the Feeding India donation
  const [cookingInstructions, setCookingInstructions] = useState('');


  const calculatedItemTotal = orderData.item.price * itemQuantity;
  const finalTipAmount = selectedTip === 'custom' ? parseFloat(customTipAmount) || 0 : selectedTip || 0;

  const grandTotal =
    calculatedItemTotal +
    orderData.billDetails.deliveryCharge +
    orderData.billDetails.taxes +
    (addDonation ? orderData.billDetails.donation : 0) +
    finalTipAmount;

  const handleQuantityChange = (change: number) => {
    setItemQuantity(prev => Math.max(1, prev + change));
  };

  const handleTipSelection = (tip: any) => {
    if (selectedTip === tip.amount || (selectedTip === 'custom' && tip.label === 'Custom')) {
      setSelectedTip(null); // Deselect if already selected
      if (tip.label === 'Custom') setCustomTipAmount('');
    } else {
      setSelectedTip(tip.label === 'Custom' ? 'custom' : tip.amount);
      if (tip.label !== 'Custom') setCustomTipAmount('');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation ? navigation.goBack() : console.log('Back')}>
          <Ionicons name="chevron-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{orderData.restaurantName}</Text>
        <TouchableOpacity onPress={() => navigation ? navigation.goBack() : console.log('Close')}>
          <Ionicons name="close" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.contentContainer}>
          {/* Delivery Info */}
          <View style={styles.section}>
            <View style={styles.addressRow}>
              <Ionicons name="location-sharp" size={22} color="#4CAF50" style={styles.iconMargin} />
              <Text style={styles.addressText} numberOfLines={1}>{orderData.deliveryAddress}</Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color="#555" />
            </View>
            <View style={styles.deliveryTimeRow}>
              <FontAwesome name="whatsapp" size={22} color="#4CAF50" style={styles.iconMargin} />
              <Text style={styles.deliveryTimeText}>Delivery in {orderData.deliveryTime}</Text>
            </View>
          </View>

          {/* Item Summary */}
          <View style={styles.section}>
            <View style={styles.itemRow}>
              <View style={[styles.vegIconOuterSmall, { borderColor: orderData.item.isVeg ? '#689F38' : '#D32F2F' }]}>
                <View style={[styles.vegIconInnerSmall, { backgroundColor: orderData.item.isVeg ? '#689F38' : '#D32F2F' }]} />
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{orderData.item.name}</Text>
                {orderData.item.addOn && <Text style={styles.itemAddOn}>Add On: {orderData.item.addOn}</Text>}
              </View>
              <View style={styles.quantityControlSmall}>
                <TouchableOpacity onPress={() => handleQuantityChange(-1)} style={styles.quantityButtonSmall}>
                  <Ionicons name="remove" size={18} color="#D32F2F" />
                </TouchableOpacity>
                <Text style={styles.quantityDisplaySmall}>{itemQuantity}</Text>
                <TouchableOpacity onPress={() => handleQuantityChange(1)} style={styles.quantityButtonSmall}>
                  <Ionicons name="add" size={18} color="#D32F2F" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.itemSubtotal}>₹ {calculatedItemTotal.toFixed(2)}</Text>
            <TouchableOpacity style={styles.cookingInstructionsButton}>
                <Text style={styles.cookingInstructionsText}>Add cooking instructions (optional)</Text>
            </TouchableOpacity>
          </View>

          {/* Offers */}
          <View style={[styles.section, styles.sectionNoBottomBorder]}>
            <Text style={styles.sectionTitle}>Offers</Text>
            <View style={styles.offerRow}>
              <MaterialIcons name="local-offer" size={20} color="#2979FF" style={styles.iconMargin} />
              <View style={styles.offerTextContainer}>
                <Text style={styles.promoCodeText}>Select a promo code</Text>
                <Text style={styles.savingsText}>{orderData.offers.savingsText}</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.viewOffersText}>View offers</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tip Valet */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Please tip your valet</Text>
            <Text style={styles.tipSubtitle}>Support your valet and make their day! 100% of your tip will be transferred to your valet.</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tipOptionsContainer}>
              {tipOptions.map((tip, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tipButton,
                    (selectedTip === tip.amount || (selectedTip === 'custom' && tip.label === 'Custom')) && styles.selectedTipButton
                  ]}
                  onPress={() => handleTipSelection(tip)}
                >
                  <MaterialCommunityIcons name={tip.iconName as any} size={24} color={(selectedTip === tip.amount || (selectedTip === 'custom' && tip.label === 'Custom')) ? '#D32F2F' : '#555'} />
                  <Text style={[styles.tipAmountText, (selectedTip === tip.amount || (selectedTip === 'custom' && tip.label === 'Custom')) && styles.selectedTipText]}>{tip.label}</Text>
                  {tip.subLabel && <Text style={styles.tipMostTipped}>{tip.subLabel}</Text>}
                </TouchableOpacity>
              ))}
            </ScrollView>
            {selectedTip === 'custom' && (
                <TextInput
                    style={styles.customTipInput}
                    placeholder="Enter custom tip amount"
                    keyboardType="numeric"
                    value={customTipAmount}
                    onChangeText={setCustomTipAmount}
                />
            )}
          </View>

          {/* Bill Details */}
          <View style={[styles.section, styles.billDetailsSection]}>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Item Total</Text>
              <Text style={styles.billAmount}>₹{calculatedItemTotal.toFixed(2)}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Delivery Charge</Text>
              <Text style={styles.billAmount}>₹{orderData.billDetails.deliveryCharge.toFixed(2)}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabelDotted}>Taxes</Text>
              <Text style={styles.billAmount}>₹{orderData.billDetails.taxes.toFixed(2)}</Text>
            </View>
            <View style={styles.billRow}>
              <TouchableOpacity onPress={() => setAddDonation(!addDonation)} style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={[styles.billLabelDotted, addDonation && styles.donationTextActive]}>
                    Donate ₹{orderData.billDetails.donation} to Feeding India Foundation
                </Text>
                <Text style={[styles.addRemoveText, addDonation && styles.donationTextActive]}>
                    {addDonation ? 'Remove' : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
             {finalTipAmount > 0 && (
                <View style={styles.billRow}>
                    <Text style={styles.billLabel}>Valet Tip</Text>
                    <Text style={styles.billAmount}>₹{finalTipAmount.toFixed(2)}</Text>
                </View>
            )}
            <View style={[styles.billRow, styles.grandTotalRow]}>
              <Text style={styles.grandTotalLabel}>Grand Total</Text>
              <Text style={styles.grandTotalAmount}>₹{grandTotal.toFixed(2)}</Text>
            </View>
          </View>

          {/* COVID-19 Emergency */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.checkboxRow} onPress={() => setIsCovidEmergency(!isCovidEmergency)}>
              <View style={[styles.checkboxSquareLarge, isCovidEmergency && styles.checkboxSquareLargeSelected]}>
                {isCovidEmergency && <Ionicons name="checkmark" size={16} color="white" />}
              </View>
              <View style={styles.covidTextContainer}>
                <Text style={styles.covidTitle}>This order is related to a COVID-19 emergency</Text>
                <Text style={styles.covidSubtitle}>This order will be prepared and delivered on priority. It will be a contactless delivery. #RestaurantsAgainstCOVID</Text>
                <Text style={styles.covidFinePrint}>Treat this as an ambulance and please don{"'"}t misuse it.</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Delivery Instructions */}
          <View style={styles.section}>
            <View style={styles.rowWithChange}>
              <Text style={styles.sectionTitle}>Delivery instructions</Text>
              <TouchableOpacity><Text style={styles.changeText}>Change</Text></TouchableOpacity>
            </View>
            <View style={styles.deliveryInstructionItem}>
              <Ionicons name="checkmark-circle" size={22} color="#4CAF50" style={styles.iconMargin} />
              <Text style={styles.instructionText}>Hand me the Order</Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.addVoiceDirections}>Add voice directions</Text>
            </TouchableOpacity>
          </View>

          {/* Your Details */}
          <View style={styles.section}>
            <View style={styles.rowWithChange}>
              <Text style={styles.sectionTitle}>Your details</Text>
              <TouchableOpacity><Text style={styles.changeText}>Change</Text></TouchableOpacity>
            </View>
            <Text style={styles.userDetailsText}>{orderData.userDetails.name}, {orderData.userDetails.phone}</Text>
          </View>

          {/* Order for Someone Else */}
          <View style={styles.section}>
             <View style={styles.rowWithChange}>
                <Text style={styles.sectionTitle}>Order for someone else</Text>
                <TouchableOpacity><Text style={styles.addText}>Add</Text></TouchableOpacity>
            </View>
            <Text style={styles.tipSubtitle}>Send personalized message and e-card</Text>
          </View>

          {/* Climate Conscious */}
          <View style={[styles.section, styles.sectionNoBottomBorder, {paddingBottom: 20}]}>
            <View style={styles.climateRow}>
                <Ionicons name="leaf" size={20} color="#4CAF50" style={styles.iconMargin} />
                <Text style={styles.sectionTitle}>Climate conscious delivery</Text>
            </View>
            <Text style={styles.tipSubtitle}>We fund environmental projects to offset the carbon footprint of our deliveries.</Text>
            <TouchableOpacity><Text style={styles.knowMoreText}>Know more <Ionicons name="chevron-forward" size={12} color="#D32F2F" /></Text></TouchableOpacity>
            <Text style={styles.cancellationPolicyText}>Orders once placed cannot be cancelled and are non-refundable.</Text>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Payment Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.paymentMethod}>
            <Image source={require('../../assets/images/dish.png')} style={styles.gpayLogo} />
            <Text style={styles.payUsingText}>PAY USING</Text>
            <MaterialIcons name="arrow-drop-down" size={20} color="#555" />
            <Text style={styles.googlePayText}>Google Pay</Text>
        </View>
        <TouchableOpacity style={styles.placeOrderButton}>
            <View>
                <Text style={styles.placeOrderTotal}>₹{grandTotal.toFixed(2)}</Text>
                <Text style={styles.totalLabel}>TOTAL</Text>
            </View>
          <Text style={styles.placeOrderText}>Place Order</Text>
          <Ionicons name="play" size={16} color="white" style={{marginLeft: 5}} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  contentContainer: { backgroundColor: '#F8F8F8', flexGrow: 1 },
  section: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 8, // Space between white sections
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionNoBottomBorder: { borderBottomWidth: 0 },
  iconMargin: { marginRight: 8 },
  addressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  addressText: { flex: 1, fontSize: 14, color: '#333' },
  deliveryTimeRow: { flexDirection: 'row', alignItems: 'center' },
  deliveryTimeText: { fontSize: 13, color: '#555' },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  vegIconOuterSmall: { width: 16, height: 16, borderWidth: 1, borderRadius: 2, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  vegIconInnerSmall: { width: 8, height: 8, borderRadius: 1 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 15, fontWeight: '600', color: '#333' },
  itemAddOn: { fontSize: 12, color: '#777', marginTop: 2 },
  quantityControlSmall: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#F48FB1', borderRadius: 4, paddingHorizontal: 4, paddingVertical: 2 },
  quantityButtonSmall: { paddingHorizontal: 6 },
  quantityDisplaySmall: { fontSize: 14, fontWeight: 'bold', color: '#D32F2F', marginHorizontal: 8 },
  itemSubtotal: { fontSize: 13, color: '#555', textAlign: 'right', marginRight: '20%', marginBottom: 10 }, // Approx align with quantity control
  cookingInstructionsButton: { alignSelf: 'flex-end', marginRight: '20%', paddingVertical: 5},
  cookingInstructionsText: { fontSize: 12, color: '#D32F2F', borderBottomWidth: 1, borderBottomColor: '#F48FB1', borderStyle: 'dotted'},

  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  offerRow: { flexDirection: 'row', alignItems: 'center' },
  offerTextContainer: { flex: 1, marginLeft: 8 },
  promoCodeText: { fontSize: 14, color: '#333' },
  savingsText: { fontSize: 12, color: '#666', marginTop: 2 },
  viewOffersText: { fontSize: 13, color: '#D32F2F', fontWeight: '500' },

  tipSubtitle: { fontSize: 13, color: '#666', marginBottom: 12, lineHeight: 18 },
  tipOptionsContainer: { paddingVertical: 5 },
  tipButton: {
    borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 8, marginRight: 10, alignItems: 'center', minWidth: 70,
  },
  selectedTipButton: { borderColor: '#D32F2F', backgroundColor: '#FFF2F2' },
  tipAmountText: { fontSize: 13, color: '#333', marginTop: 4, fontWeight: '500' },
  selectedTipText: { color: '#D32F2F'},
  tipMostTipped: { fontSize: 9, color: '#D32F2F', fontWeight: 'bold', marginTop: 2, textTransform:'uppercase' },
  customTipInput: {
    borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 6, padding: 10, marginTop: 10, fontSize: 14
  },

  billDetailsSection: { backgroundColor: '#FFFDF5', borderColor: '#FCEBCD' }, // Light yellow
  billRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  billLabel: { fontSize: 13, color: '#555' },
  billLabelDotted: { fontSize: 13, color: '#555', borderBottomWidth: 1, borderBottomColor: '#D1C7B3', borderStyle: 'dotted', alignSelf: 'flex-start'},
  billAmount: { fontSize: 13, color: '#555' },
  donationTextActive: {color: '#D32F2F'},
  addRemoveText: { fontSize: 12, color: '#D32F2F', fontWeight: '500', marginLeft: 10, textTransform: 'uppercase' },
  grandTotalRow: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#FCEBCD' },
  grandTotalLabel: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  grandTotalAmount: { fontSize: 16, fontWeight: 'bold', color: '#333' },

  checkboxRow: { flexDirection: 'row', alignItems: 'flex-start' },
  checkboxSquareLarge: { width: 20, height: 20, borderWidth: 1.5, borderColor: '#BDBDBD', borderRadius: 3, justifyContent: 'center', alignItems: 'center', marginRight: 12, marginTop: 2 },
  checkboxSquareLargeSelected: { backgroundColor: '#D32F2F', borderColor: '#D32F2F' },
  covidTextContainer: { flex: 1 },
  covidTitle: { fontSize: 14, fontWeight: '600', color: '#333' },
  covidSubtitle: { fontSize: 12, color: '#666', marginTop: 3, lineHeight: 16 },
  covidFinePrint: { fontSize: 11, color: '#D32F2F', marginTop: 5 },

  rowWithChange: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5},
  changeText: { fontSize: 13, color: '#D32F2F', fontWeight: '500' },
  addText: { fontSize: 13, color: '#D32F2F', fontWeight: '500' },
  deliveryInstructionItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 5},
  instructionText: { fontSize: 14, color: '#333' },
  addVoiceDirections: { fontSize: 12, color: '#D32F2F', borderBottomWidth: 1, borderBottomColor: '#F48FB1', borderStyle: 'dotted', alignSelf: 'flex-start', marginLeft: 30, paddingBottom: 1},
  userDetailsText: { fontSize: 14, color: '#333' },

  climateRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 0},
  knowMoreText: { fontSize: 13, color: '#D32F2F', fontWeight: '500', marginTop: 5},
  cancellationPolicyText: { fontSize: 12, color: '#E53935', marginTop: 15, lineHeight: 16},

  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    paddingHorizontal: 16, paddingVertical: 10,
    borderTopWidth: 1, borderTopColor: '#E0E0E0',
    paddingBottom: Platform.OS === 'ios' ? Math.max(10, (Dimensions.get('window') as any).safeAreaInsets?.bottom || 0) : 10,
    height: Platform.OS === 'ios' ? 70 + Math.max(0, ((Dimensions.get('window') as any).safeAreaInsets?.bottom || 0) - 10) : 70,
  },
  paymentMethod: {flexDirection:'row', alignItems:'center', flex:0.7},
  gpayLogo: {width: 20, height: 20, resizeMode: 'contain', marginRight: 4},
  payUsingText: {fontSize: 10, color: '#777', marginRight: 2},
  googlePayText: {fontSize: 13, color: '#333', fontWeight: '500', position:'absolute', top: 18, left: 0},
  placeOrderButton: {
    flex: 1, backgroundColor: '#D32F2F', borderRadius: 6,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8,
  },
  placeOrderTotal: { color: 'white', fontSize: 15, fontWeight: 'bold'},
  totalLabel: {color: '#FFCDD2', fontSize: 9, textTransform: 'uppercase'},
  placeOrderText: { color: 'white', fontSize: 15, fontWeight: 'bold'},
});

export default CheckoutScreen;