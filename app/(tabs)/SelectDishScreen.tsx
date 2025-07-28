import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Fallback image in case the provided image is missing
const fallbackImage = require('../../assets/images/dish.png'); // Ensure you have a placeholder image

// Dummy Data - structured to match the UI
const initialItemData = {
  name: 'Plant Protein Bowl',
  rating: 4.5,
  reviews: 11,
  isBestseller: true,
  description: '[Veg preparation] Spring mix, plant based, organic...read more',
  image: require('../../assets/images/dish.png'), // Ensure this image exists
  basePrice: 199,
  addOns: {
    title: 'Add On',
    subtitle: 'You can choose up to 4 options',
    limit: 4,
    options: [
      { id: 'ao1', name: 'Pesto Paneer', price: 40, isVeg: true, selected: false },
      { id: 'ao2', name: 'Paneer', price: 40, isVeg: true, selected: false },
      { id: 'ao3', name: 'Extra Veggies', price: 40, isVeg: true, selected: false },
      { id: 'ao4', name: 'Mushroom', price: 40, isVeg: true, selected: false },
      { id: 'ao5', name: 'Corn', price: 40, isVeg: true, selected: false },
      { id: 'ao6', name: 'Chilli Paneer', price: 40, isVeg: true, selected: false },
    ],
  },
  proteins: {
    title: 'Choose Your Protein',
    subtitle: 'You can choose up to 3 options',
    limit: 3,
    options: [
      { id: 'p1', name: 'BBQ Protein', price: 40, isVeg: true, selected: false },
    ],
  },
};

const StarRating = ({ rating, reviews }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <View style={styles.starRatingContainer}>
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesome
          key={`full_${i}`}
          name="star"
          size={16}
          color="#FFC107"
          accessible={true}
          accessibilityLabel="Star rating"
        />
      ))}
      {halfStar && (
        <FontAwesome
          name="star-half-full"
          size={16}
          color="#FFC107"
          accessible={true}
          accessibilityLabel="Half star rating"
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesome
          key={`empty_${i}`}
          name="star-o"
          size={16}
          color="#FFC107"
          accessible={true}
          accessibilityLabel="Empty star"
        />
      ))}
      <Text style={styles.reviewCountText} accessible={true} accessibilityLabel={`${reviews} reviews`}>
        {reviews}
      </Text>
    </View>
  );
};

const CheckboxItem = ({ item, onSelect, isSelected, itemType, selectionLimit, currentSelectionCount }) => {
  const canSelectMore = currentSelectionCount < selectionLimit;

  const handlePress = () => {
    if (isSelected || canSelectMore) {
      onSelect(item.id, itemType);
    } else {
      Alert.alert(
        'Selection Limit Reached',
        `You can only select up to ${selectionLimit} ${itemType === 'addOns' ? 'add-ons' : 'proteins'}.`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.checkItemContainer}
      onPress={handlePress}
      activeOpacity={0.7}
      accessible={true}
      accessibilityLabel={`${item.name} ${isSelected ? 'selected' : 'unselected'}`}
    >
      <View style={[styles.vegIconOuterSmall, { borderColor: item.isVeg ? '#689F38' : '#D32F2F' }]}>
        <View style={[styles.vegIconInnerSmall, { backgroundColor: item.isVeg ? '#689F38' : '#D32F2F' }]} />
      </View>
      <Text style={styles.checkItemName}>{item.name}</Text>
      <Text style={styles.checkItemPrice}>₹{item.price}</Text>
      <View
        style={[
          styles.checkboxSquare,
          isSelected && styles.checkboxSquareSelected,
          !isSelected && !canSelectMore && styles.checkboxDisabled,
        ]}
      >
        {isSelected && <Ionicons name="checkmark" size={14} color="white" />}
      </View>
    </TouchableOpacity>
  );
};

const ItemCustomizationScreen = ({ onClose }) => {
  const [itemData, setItemData] = useState(JSON.parse(JSON.stringify(initialItemData)));
  const [quantity, setQuantity] = useState(1);
  const [currentTotalPrice, setCurrentTotalPrice] = useState(itemData.basePrice);

  useEffect(() => {
    let price = itemData.basePrice;
    itemData.addOns.options.forEach((opt) => {
      if (opt.selected) price += opt.price;
    });
    itemData.proteins.options.forEach((opt) => {
      if (opt.selected) price += opt.price;
    });
    setCurrentTotalPrice(price * quantity);
  }, [itemData.addOns.options, itemData.proteins.options, quantity]);

  const handleSelection = (id, type) => {
    setItemData((prevData) => {
      const newData = { ...prevData };
      const section = { ...newData[type] };
      section.options = section.options.map((opt) => ({ ...opt }));

      const optionIndex = section.options.findIndex((opt) => opt.id === id);
      if (optionIndex > -1) {
        const currentSelectedCount = section.options.filter((opt) => opt.selected).length;
        if (section.options[optionIndex].selected) {
          section.options[optionIndex].selected = false;
        } else if (currentSelectedCount < section.limit) {
          section.options[optionIndex].selected = true;
        }
      }
      newData[type] = section;
      return newData;
    });
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => {
      const newQuantity = prev + change;
      return newQuantity >= 1 ? newQuantity : 1;
    });
  };

  const handleAddToCart = () => {
    // Implement add to cart logic here
    Alert.alert('Success', 'Item added to cart!', [{ text: 'OK' }]);
    onClose(); // Close modal after adding to cart
  };

  const currentAddOnSelectionCount = itemData.addOns.options.filter((opt) => opt.selected).length;
  const currentProteinSelectionCount = itemData.proteins.options.filter((opt) => opt.selected).length;
const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeAreaBackground}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.6)" translucent />
      <TouchableOpacity style={styles.dimmedOverlay} onPress={onClose} activeOpacity={1} />
      <View style={styles.modalView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.imageSection}>
            <Image
              source={itemData.image}
              style={styles.foodImage}
              defaultSource={fallbackImage}
              accessible={true}
              accessibilityLabel={itemData.name}
            />
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={onClose}
              accessible={true}
              accessibilityLabel="Close modal"
            >
              <Ionicons name="close" size={22} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.contentPadding}>
            <Text style={styles.itemName}>{itemData.name}</Text>
            <View style={styles.ratingRow}>
              <StarRating rating={itemData.rating} reviews={itemData.reviews} />
              {itemData.isBestseller && (
                <Text style={styles.bestsellerTag}>Bestseller</Text>
              )}
            </View>
            <Text style={styles.itemDescription}>{itemData.description}</Text>
          </View>

          <View style={styles.sectionSeparator} />

          <View style={styles.contentPadding}>
            <Text style={styles.sectionHeader}>{itemData.addOns.title}</Text>
            <Text style={styles.sectionSubheader}>{itemData.addOns.subtitle}</Text>
            {itemData.addOns.options.map((option) => (
              <CheckboxItem
                key={option.id}
                item={option}
                onSelect={handleSelection}
                isSelected={option.selected}
                itemType="addOns"
                selectionLimit={itemData.addOns.limit}
                currentSelectionCount={currentAddOnSelectionCount}
              />
            ))}
          </View>

          <View style={styles.sectionSeparator} />

          <View style={styles.contentPadding}>
            <Text style={styles.sectionHeader}>{itemData.proteins.title}</Text>
            <Text style={styles.sectionSubheader}>{itemData.proteins.subtitle}</Text>
            {itemData.proteins.options.map((option) => (
              <CheckboxItem
                key={option.id}
                item={option}
                onSelect={handleSelection}
                isSelected={option.selected}
                itemType="proteins"
                selectionLimit={itemData.proteins.limit}
                currentSelectionCount={currentProteinSelectionCount}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.bottomActionContainer}>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              onPress={() => handleQuantityChange(-1)}
              style={styles.quantityButton}
              accessible={true}
              accessibilityLabel="Decrease quantity"
            >
              <Ionicons name="remove" size={20} color="#D32F2F" />
            </TouchableOpacity>
            <Text
              style={styles.quantityDisplay}
              accessible={true}
              accessibilityLabel={`Quantity ${quantity}`}
            >
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={() => handleQuantityChange(1)}
              style={styles.quantityButton}
              accessible={true}
              accessibilityLabel="Increase quantity"
            >
              <Ionicons name="add" size={20} color="#D32F2F" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.addToCartMainButton}
            onPress={() => navigation.navigate('Cart')}
            accessible={true}
            accessibilityLabel={`Add to cart for ₹${currentTotalPrice}`}
          >
            <Text style={styles.addToCartButtonText}>Add ₹{currentTotalPrice}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaBackground: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  dimmedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    height: screenHeight * 0.78,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  scrollViewContent: {
    paddingBottom: 80, // Ensure content is not hidden by bottom action bar
  },
  imageSection: {
    width: '100%',
    height: screenHeight * 0.3,
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  closeModalButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 15 : 20,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentPadding: {
    paddingHorizontal: 16,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 15,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  starRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewCountText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#616161',
  },
  bestsellerTag: {
    backgroundColor: '#FFEBEB',
    color: '#D32F2F',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 12,
    borderWidth: 0.5,
    borderColor: '#F48FB1',
  },
  itemDescription: {
    fontSize: 13,
    color: '#424242',
    lineHeight: 18,
    marginBottom: 15,
  },
  sectionSeparator: {
    height: 8,
    backgroundColor: '#F5F5F5',
    marginVertical: 5,
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 15,
    marginBottom: 2,
  },
  sectionSubheader: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 12,
  },
  checkItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEEEEE',
  },
  vegIconOuterSmall: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  vegIconInnerSmall: {
    width: 7,
    height: 7,
    borderRadius: 1,
  },
  checkItemName: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
  checkItemPrice: {
    fontSize: 14,
    color: '#424242',
    marginHorizontal: 10,
  },
  checkboxSquare: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#BDBDBD',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  checkboxSquareSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#388E3C',
  },
  checkboxDisabled: {
    backgroundColor: '#E0E0E0',
    borderColor: '#BDBDBD',
  },
  bottomActionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: Platform.OS === 'ios' ? Math.max(10, Dimensions.get('window').safeAreaInsets?.bottom || 0) : 10,
    height: Platform.OS === 'ios' ? 65 + Math.max(0, Dimensions.get('window').safeAreaInsets?.bottom || 0) : 65,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    paddingHorizontal: 6,
    marginRight: 12,
  },
  quantityButton: {
    padding: 8,
  },
  quantityDisplay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  addToCartMainButton: {
    flex: 1,
    backgroundColor: '#D32F2F',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ItemCustomizationScreen;