import { Entypo, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import SelectDishScreen from '../(tabs)/SelectDishScreen';

// Dummy Data for Menu Items
const menuItemsData = [
  {
    id: '1',
    name: 'Plant Protien Bowl',
    price: '220',
    rating: 4.5,
    reviews: 11,
    isVeg: true,
    mustTry: true,
    description: '[Veg preparation] Spring mix, plant based, organic... read more',
    image: require('../../assets/images/image.png'), // Replace with your actual image path
  },
  {
    id: '2',
    name: 'Spring Veg Plater',
    price: '350',
    rating: 4.0,
    reviews: 16,
    isVeg: true,
    mustTry: true,
    description: '[Veg preparation] Spring mix, plant based, organic... read more',
    image: require('../../assets/images/images.png'), // Replace with your actual image path
  },
];

// Placeholder images (create these in your assets folder)
// assets/food1.png
// assets/food2.png

const StarRating = ({ rating, reviews }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  

  return (
    <View style={styles.ratingContainer}>
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesome key={`full_${i}`} name="star" size={14} color="#FFB300" /> // Gold color for stars
      ))}
      {halfStar && <FontAwesome name="star-half-full" size={14} color="#FFB300" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesome key={`empty_${i}`} name="star-o" size={14} color="#FFB300" />
      ))}
      <Text style={styles.reviewCount}> {reviews}</Text>
    </View>
  );
};

const App = () => {
  const [activeMainTab, setActiveMainTab] = useState('DELIVERY');
  const [activeMenuTab, setActiveMenuTab] = useState('Healthy');
  const [isVeg, setIsVeg] = useState(false);
  const [isEgg, setIsEgg] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [selectedItem, setSelectedItem] = useState(null); // State for selected item
  const MenuItem = ({ item }) => (
    <View style={styles.menuItemContainer}>
      <View style={styles.menuItemTextContent}>
        <View style={[styles.vegIconOuter, { borderColor: item.isVeg ? '#2E7D32' : '#C62828' }]}>
            <View style={[styles.vegIconInner, { backgroundColor: item.isVeg ? '#2E7D32' : '#C62828' }]} />
        </View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹ {item.price}</Text>
        <View style={styles.ratingAndTagContainer}>
          <StarRating rating={item.rating} reviews={item.reviews} />
          {item.mustTry && <Text style={styles.mustTryTag}>Must Try</Text>}
        </View>
        <Text style={styles.itemDescription} numberOfLines={2} ellipsizeMode="tail">
          {item.description}
        </Text>
      </View>
      <View style={styles.menuItemImageContainer}>
        <Image source={item.image} style={styles.itemImage} />
        <TouchableOpacity onPress={() => {
            setSelectedItem(item); // Set the selected item
            setIsModalVisible(true); // Open the modal
          }}style={styles.addButton}>
          <Text style={styles.addButtonText}>ADD</Text>
          <Entypo name="plus" size={14} color="#D32F2F" style={{ marginLeft: 3 }}/>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={28} color="#333333" />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingText}>4.2</Text>
              <FontAwesome name="star" size={9} color="white" style={{marginLeft: 2, marginBottom: 1}}/>
              <Text style={styles.deliveryTextSmall}>DELIVERY</Text>
            </View>
            <View style={styles.photosBox}>
              {/* In the actual image, this is a thumbnail of photos,
                  for simplicity, using text. Replace with ImageBackground if needed. */}
              <Text style={styles.photosText}>6</Text>
              <Text style={styles.photosLabel}>PHOTOS</Text>
            </View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 130 }} // Space for bottom bar + menu button
        >
          {/* Restaurant Info */}
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>Eat Healthy</Text>
            <Text style={styles.cuisine}>Healthy food, South Indian</Text>
            <Text style={styles.location}>Kukatpally, Hyderabad</Text>
            <View style={styles.safetyBadgeContainer}>
                <View style={styles.safetyBadge}>
                    <Text style={styles.safetyBadgeTextLine1}>MAX SAFETY</Text>
                    <Text style={styles.safetyBadgeTextLine2}>DELIVERY</Text>
                </View>
            </View>
          </View>

          {/* Main Tabs */}
          <View style={styles.mainTabsOuterContainer}>
            <View style={styles.mainTabsInnerContainer}>
              {['DELIVERY', 'DINING', 'REVIEWS'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.mainTab,
                    activeMainTab === tab && styles.activeMainTab,
                  ]}
                  onPress={() => setActiveMainTab(tab)}>
                  <Text
                    style={[
                      styles.mainTabText,
                      activeMainTab === tab && styles.activeMainTabText,
                    ]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Delivery Details */}
          <View style={styles.deliveryDetailsContainer}>
            <View style={styles.deliveryDetailItem}>
              <MaterialIcons name="delivery-dining" size={22} color="#757575" />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.detailLabel}>MODE</Text>
                <Text style={styles.detailValue}>delivery</Text>
              </View>
            </View>
            <View style={styles.deliveryDetailItem}>
              <Ionicons name="time-outline" size={22} color="#757575" />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.detailLabel}>TIME</Text>
                <Text style={styles.detailValue}>40 mins</Text>
              </View>
            </View>
            <View style={styles.deliveryDetailItem}>
               <Ionicons name="pricetag" size={16} color="#1E88E5" style={styles.offerIcon}/>
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.detailLabel}>OFFERS</Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.detailValueOffers}>view all (3)</Text>
                  <MaterialIcons name="arrow-drop-down" size={20} color="#424242" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.distanceChargeContainer}>
            <MaterialIcons name="moped" size={24} color="#424242" />
            <Text style={styles.distanceChargeText}>₹25 distance charge</Text>
          </View>

          {/* Menu Tabs */}
          <View style={styles.menuTabsContainer}>
            {['Full Menu', 'Healthy'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.menuTab,
                  activeMenuTab === tab && styles.activeMenuTab,
                ]}
                onPress={() => setActiveMenuTab(tab)}>
                <Text
                  style={[
                    styles.menuTabText,
                    activeMenuTab === tab && styles.activeMenuTabText,
                  ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Filters */}
          <View style={styles.filtersContainer}>
            <TouchableOpacity style={styles.checkboxOuterContainer} onPress={() => setIsVeg(!isVeg)}>
              <View style={[styles.checkbox, isVeg && styles.checkboxChecked_Veg]}>
                {/* {isVeg && <Ionicons name="checkmark" size={10} color="white" />} */}
              </View>
              <Text style={styles.checkboxLabel}>Veg</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkboxOuterContainer} onPress={() => setIsEgg(!isEgg)}>
              <View style={[styles.checkbox, isEgg && styles.checkboxChecked_Egg]}>
                {/* {isEgg && <Ionicons name="checkmark" size={10} color="white" />} */}
              </View>
              <Text style={styles.checkboxLabel}>Egg</Text>
            </TouchableOpacity>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#E53935" style={{marginRight: 5}} />
              <TextInput
                placeholder="Search"
                placeholderTextColor="#9E9E9E"
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Recommended Section */}
          <View style={styles.recommendedHeader}>
            <Text style={styles.recommendedTitle}>Recommended</Text>
            <MaterialIcons name="keyboard-arrow-up" size={28} color="#424242" />
          </View>

          {/* Menu Items List */}
          {menuItemsData.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </ScrollView>

        {/* Bottom Offer Banner */}
        <View style={styles.bottomOfferBanner}>
          <View style={styles.offerDiscountBox}>
            <Text style={styles.offerDiscountText}>30% OFF up to ₹75</Text>
          </View>
          <View style={styles.offerCodeBox}>
            <Text style={styles.offerCodeText}>Use code ZOMSAFETY on orders with items worth</Text>
            <Text style={styles.offerCodePrice}>₹159 or more</Text>
          </View>
        </View>

        {/* Floating Menu Button */}
        <TouchableOpacity style={styles.floatingMenuButton}>
          <Ionicons name="menu" size={22} color="white" />
          <Text style={styles.floatingMenuButtonText}>Menu</Text>
        </TouchableOpacity>
        {/* Customization Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          {selectedItem && (
            <SelectDishScreen
              itemData={selectedItem}
              onClose={() => setIsModalVisible(false)}
            />
          )}
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 5 : 10, // Adjust for status bar
    paddingBottom: 10,
    backgroundColor: '#FFFFFF', // Ensure header bg is white
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBox: {
    backgroundColor: '#689F38', // Green
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 10,
    flexDirection: 'row'
  },
  ratingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  deliveryTextSmall: {
    color: 'white',
    fontSize: 7,
    fontWeight: 'bold',
    position: 'absolute', // To position below star and number
    bottom: -8, // Adjust as needed
    left: '50%',
    transform: [{ translateX: -19 }], // Center below
    letterSpacing: 0.5,
  },
  photosBox: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 55,
    height: 35, // Match height of rating box
    // In the original screenshot, this has an image preview.
    // You might want to use <ImageBackground>
  },
  photosText: {
    color: '#424242',
    fontWeight: 'bold',
    fontSize: 13,
  },
  photosLabel: {
    color: '#757575',
    fontSize: 8,
    fontWeight: '600',
    marginTop: -2,
  },
  restaurantInfo: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 5,
  },
  restaurantName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#212121',
  },
  cuisine: {
    fontSize: 14,
    color: '#616161',
    marginTop: 2,
  },
  location: {
    fontSize: 13,
    color: '#757575',
    marginTop: 1,
  },
  safetyBadgeContainer: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  safetyBadge: {
    backgroundColor: '#E3F2FD', // Light blue background
    borderWidth: 1,
    borderColor: '#90CAF9', // Lighter blue border
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignItems: 'center',
  },
  safetyBadgeTextLine1: {
    color: '#1565C0', // Darker blue text
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  safetyBadgeTextLine2: {
    color: '#1565C0',
    fontSize: 7,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginTop: -1
  },
  mainTabsOuterContainer: {
    paddingHorizontal: 16,
    marginTop: 15,
    marginBottom: 5,
  },
  mainTabsInnerContainer: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE', // Background for the tab bar
    borderRadius: 8,
    overflow: 'hidden', // Clip children to rounded corners
    height: 42,
  },
  mainTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeMainTab: {
    backgroundColor: '#212121', // Black for active tab
  },
  mainTabText: {
    fontSize: 13,
    color: '#757575',
    fontWeight: '600',
  },
  activeMainTabText: {
    color: '#FFFFFF', // White text for active tab
  },
  deliveryDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 15,
    alignItems: 'flex-start',
  },
  deliveryDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 9,
    color: '#757575',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 12,
    color: '#424242',
    fontWeight: '500',
  },
  detailValueOffers: {
    fontSize: 12,
    color: '#424242',
    fontWeight: '500',
    marginRight: -3, // Pull dropdown closer
  },
  offerIcon: {
    backgroundColor: '#BBDEFB', // Light blue circle
    borderRadius: 10,
    padding: 3,
    marginRight: -2, // Pull text closer
  },
  distanceChargeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal:16,
    borderRadius: 6,
    marginTop: 5,
  },
  distanceChargeText: {
    marginLeft: 10,
    fontSize: 13,
    color: '#424242',
    fontWeight: '500',
  },
  menuTabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  menuTab: {
    paddingBottom: 10, // Space for the underline
    marginRight: 30,
    paddingTop: 10,
  },
  activeMenuTab: {
    borderBottomWidth: 2.5,
    borderBottomColor: '#D32F2F', // Red underline
  },
  menuTabText: {
    fontSize: 16,
    color: '#616161',
    fontWeight: '500',
  },
  activeMenuTabText: {
    color: '#212121',
    fontWeight: 'bold',
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  checkboxOuterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderColor: '#BDBDBD', // Grey border for unchecked
    borderRadius: 2,
    marginRight: 8,
    backgroundColor: '#F5F5F5', // Light grey fill for unchecked
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked_Veg: { // No specific style for checkmark, just border/bg change
    backgroundColor: '#4CAF50', // Green for Veg
    borderColor: '#388E3C',
  },
  checkboxChecked_Egg: {
    backgroundColor: '#FFC107', // Yellow for Egg (example)
    borderColor: '#FFA000',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#616161',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    paddingHorizontal: 10,
    flex: 1,
    height: 40,
    backgroundColor: '#FAFAFA'
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#424242',
    marginLeft: 5,
  },
  recommendedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
  },
  recommendedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  menuItemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  menuItemTextContent: {
    flex: 1,
    marginRight: 10,
  },
  vegIconOuter: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  vegIconInner: {
    width: 8,
    height: 8,
    borderRadius: 1, // slight rounding for the inner dot
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555555',
    marginVertical: 4,
  },
  ratingAndTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewCount: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  mustTryTag: {
    backgroundColor: '#FFF3E0', // Very light orange/red
    color: '#E65100', // Darker orange/red
    fontSize: 9,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: '#FFCC80',
  },
  itemDescription: {
    fontSize: 11.5,
    color: '#757575',
    marginTop: 4,
    lineHeight: 16,
  },
  menuItemImageContainer: {
    width: 90, // Slightly smaller to match image
    alignItems: 'center',
    position: 'relative', // For absolute positioning of ADD button
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 5,
    position: 'absolute',
    bottom: -10, // Overlap image
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#D32F2F', // Red color
    fontWeight: 'bold',
    fontSize: 13,
  },
  bottomOfferBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F9F9F9', // Slightly off-white
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    height: 60, // Fixed height for the banner
  },
  offerDiscountBox: {
    backgroundColor: '#1E88E5', // Blue
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 4,
    marginRight: 12,
  },
  offerDiscountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12.5,
  },
  offerCodeBox: {
    flex: 1,
  },
  offerCodeText: {
    fontSize: 10.5,
    color: '#555555',
  },
  offerCodePrice: {
    fontSize: 10.5,
    color: '#555555',
    fontWeight: '600',
  },
  floatingMenuButton: {
    position: 'absolute',
    bottom: 75, // Above the offer banner (60 banner + 15 margin)
    right: 20,
    backgroundColor: '#212121', // Black
    borderRadius: 25, // Make it more oval/circular
    paddingHorizontal: 18,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  floatingMenuButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default App;