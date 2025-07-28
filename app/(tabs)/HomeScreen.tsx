import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import React from 'react';
import {
  FlatList,
  Image,
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
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RestaurantCard = ({ restaurant }) => {
  const navigation = useNavigation(); // Hook to access navigation
  return (
  <TouchableOpacity onPress={() => navigation.navigate('Shop')} style={styles.restaurantCard}>
    <Image source={restaurant.image} style={styles.restaurantImage} />
    <View style={styles.restaurantInfo}>
      <View style={styles.restaurantHeader}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{restaurant.rating} </Text>
          <Icon name="star" size={10} color="#fff" />
        </View>
      </View>
      <View style={styles.restaurantDetailsRow}>
        <Text style={styles.restaurantCuisine}>{restaurant.description}</Text>
        <Text style={styles.restaurantPrice}>{restaurant.price}</Text>
      </View>
      <View style={styles.promoContainer}>
        <Image 
          source={require('../../assets/images/green leaf.png')} // NOTE: Replace with your actual asset
          style={styles.promoIconLeaf} 
        />
        <Text style={styles.promoText}>
          Zomato funds environmental projects to offset delivery carbon footprint
        </Text>
        <Image 
          source={require('../../assets/images/Arrow.png')} // NOTE: Replace with your actual asset
          style={styles.promoIconGraph}
        />
        <View style={styles.maxSafetyContainer}>
          <Text style={styles.maxSafetyText}>MAX SAFETY</Text>
          <Text style={styles.maxSafetySubText}>DELIVERY</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);
};


const App = () => {
  const categories = [
    { name: 'Healthy', image: require('../../assets/images/Healthy.png') },
    { name: 'Biryani', image: require('../../assets/images/Biryani.png') },
    { name: 'Pizza', image: require('../../assets/images/Pizza.png') },
    { name: 'Haleem', image: require('../../assets/images/Haleem.png') },
    { name: 'Chicken', image: require('../../assets/images/Chicken.png') },
    { name: 'Burger', image: require('../../assets/images/Burger.png') },
    { name: 'Cake', image: require('../../assets/images/Cake.png') },
    { name: 'Shawarma', image: require('../../assets/images/Shawarma.png') },
  ];

  const restaurants = [
    { name: 'Eat Healthy', rating: 4.3, price: '₹300 for one', description: 'Healthy food', image: require('../../assets/images/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png') },
    { name: 'Amul', rating: 4.2, price: '₹150 for one', description: 'Desserts, Ice Cream, Beverages', image: require('../../assets/images/aleksandra-tanasiienko-q1uN73kcSnI-unsplash 1.png') },
    { name: 'Tinku Fast Food Center', rating: 4.0, price: '₹150 for one', description: 'Chinese, Italian', image: require('../../assets/images/hanxiao-Enec99GUXm8-unsplash 2.png') },
    { name: 'Hanuman Sweets', rating: 4.1, price: '₹100 for one', description: 'Mithai, Beverages', image: require('../../assets/images/junior-reis-FmX_S5Sb1rI-unsplash 1.png') },
    { name: 'Snacks Corner', rating: 4.1, price: '₹100 for one', description: 'Beverages', image: require('../../assets/images/karina-kashuba-DHgXxWH8BnA-unsplash 1.png') },
    { name: 'Pallavi Biryani', rating: 3.8, price: '₹150 for one', description: 'Biryani, North Indian, Chinese', image: require('../../assets/images/shreyak-singh-0j4bisyPo3M-unsplash 1.png') },
  ];
  
  const filters = ['MAX safety', 'PRO', 'Cuisines', 'Rating', 'Popular'];

  const ListHeader = () => (
    <>
      <View style={styles.header}>
        <Icon name="map-marker" size={24}  />
        <Text style={styles.locationText} numberOfLines={1}>
          ..................................................
        </Text>
        <Icon name="bars" size={22} color="#333" />
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={18} color="#E53935" style={styles.searchIcon} />
        <TextInput
          placeholder="Restaurant name, cuisine, or a dish..."
          style={styles.searchInput}
          placeholderTextColor="#9E9E9E"
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>MAX safety</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="diamond" size={12} color="#757575" />
          <Text style={styles.filterText}> PRO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Cuisines </Text>
          <Icon name="caret-down" size={12} color="#616161" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Rating</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="sort-amount-asc" size={12} color="#616161" />
          <Text style={styles.filterText}> Popular</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bannerContainer}>
        <Image source={require('../../assets/images/Offer.png')} style={styles.bannerImage} />
        <Image source={require('../../assets/images/Discounts.png')} style={styles.bannerImage} />
      </View>

      <Text style={styles.sectionTitle}>Eat what makes you happy</Text>
      <View style={styles.categoryGrid}>
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} style={styles.categoryItem}>
            <Image source={cat.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.seeMoreButton}>
        <Text style={styles.seeMoreText}>See more</Text>
        <Icon name="caret-down" size={12} color="#616161" />
      </TouchableOpacity>

      <Text style={styles.restaurantsTitle}>396 restaurants around you</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }} // Padding to not hide last item behind tab bar
      />
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="shopping-bag" size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialCommunityIcons name="shoe-print" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="diamond" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialCommunityIcons name="heart" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Header & Search
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 10,
    paddingBottom: 5,
  },
  locationText: {
    flex: 1,
    color: '#BDBDBD',
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
  },
  searchIcon: {
    paddingLeft: 12,
  },
  searchInput: {
    flex: 1,
    height: 45,
    paddingLeft: 10,
    fontSize: 14,
  },
  // Filters
  filterContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  filterText: {
    fontSize: 13,
    color: '#616161',
  },
  // Banners
  bannerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 25,
  },
  bannerImage: {
    width: '48%',
    height: 120,
    borderRadius: 5,
  },
  // Categories
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 15,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginTop: 15,
  },
  categoryItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryImage: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    marginLeft:10,
    marginRight:10,
  },
  seeMoreText: {
    fontSize: 14,
    color: '#616161',
    marginRight: 5,
  },
  // Restaurant List
  restaurantsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  // Restaurant Card
  restaurantCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  restaurantImage: {
    width: '100%',
    height: 190,
  },
  restaurantInfo: {
    padding: 12,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#267E3E',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  ratingText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  restaurantDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom:10,
  },
  restaurantCuisine: {
    fontSize: 13,
    color: '#757575',
    width: '60%',
  },
  restaurantPrice: {
    fontSize: 13,
    color: '#757575',
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap', // Allows items to wrap if they don't fit
  },
  promoIconLeaf: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  promoText: {
    fontSize: 12,
    color: '#828282',
    flex: 1,
    lineHeight: 16,
  },
  promoIconGraph: {

    marginHorizontal: 8,
  },
  maxSafetyContainer: {
    borderWidth: 1.5,
    borderColor: '#FFB300', // Yellow/gold border
    backgroundColor: '#267E3E', // Green background
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  maxSafetyText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  maxSafetySubText: {
    color: '#fff',
    fontSize: 6,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Bottom Tab Bar
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;