import React from 'react'; 
import { StyleSheet, View, ScrollView } from 'react-native';
import { Provider as PaperProvider, List, DefaultTheme } from 'react-native-paper';

// TODO MAKE CLOSE WHEN OTHER INTERACTION OCCURES

export const DropdownMenu = ({
  items = [],
  title = 'Select an option',
  onSelect,
  width = 250,         // Width in pixels (prop)
  borderRadius = 24,    // Border radius in pixels (prop)
  headerPadding = 0,    // Additional vertical padding (in px) for header to adjust its height
  containerHeight = 50  // Height for the main (outer) container
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  // Compute a minimum header height (base + additional headerPadding)
  const computedHeaderHeight = 0 + headerPadding;

  const handlePress = () => setExpanded(!expanded);

  const handleSelect = (item) => {
    setSelectedItem(item);
    if (onSelect) {
      onSelect(item);
    }
    setExpanded(false);
  };

  // Dynamic style for the accordion container:
  // When closed: fully rounded. When open: only the top corners are rounded.
  const accordionStyle = expanded
    ? {
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        overflow: 'hidden',
      }
    : {
        borderRadius: borderRadius,
        overflow: 'hidden',
      };

  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent', // Ensure our background is transparent
    },
  };

  return (
    // Outer container: explicitly sized with width, height, and margins.
    <View style={[styles.outerContainer, { width: width, height: containerHeight, margin: 10 }]}>
      {/* Dropdown wrapper: absolutely positioned to fill the outer container.
          zIndex is set dynamically: 9999 when expanded, 5000 when closed */}
      <View style={[styles.dropdownWrapper, { zIndex: expanded ? 9999 : 5000 }]}>
        {/* This inner view constrains the dropdown to the desired width */}
        <View style={{ width: width }}>
          <List.Accordion
            title={selectedItem ? selectedItem.label : title}
            expanded={expanded}
            onPress={handlePress}
            // Only the right chevron is shown.
            right={(props) => (
              <View style={{ marginRight: -8 }}>
                <List.Icon
                  {...props}
                  icon={expanded ? 'chevron-up' : 'chevron-down'}
                  color="#fff"
                  style={styles.icon}
                />
              </View>
            )}
            titleStyle={styles.titleText}
            // Override inner header styles to force our custom vertical spacing and height.
            contentStyle={[
              styles.accordionHeader,
              {
                paddingVertical: headerPadding,
                minHeight: computedHeaderHeight,
              },
            ]}
            // Pass our custom style to override default internal padding.
            style={[
              styles.accordion,
              accordionStyle,
              {
                paddingVertical: headerPadding,
                minHeight: computedHeaderHeight,
              },
            ]}
          >
            {/* Scrollable container for items with a maxHeight */}
            <ScrollView
              style={[
                styles.scrollContainer,
                {
                  borderBottomLeftRadius: borderRadius,
                  borderBottomRightRadius: borderRadius,
                },
              ]}
            >
              {items.map((item, index) => {
                const isSelected = selectedItem && selectedItem.label === item.label;
                return (
                  <List.Item
                    key={index}
                    title={item.label}
                    onPress={() => handleSelect(item)}
                    titleStyle={styles.itemText}
                    style={[styles.item, isSelected && styles.selectedItem]}
                  />
                );
              })}
            </ScrollView>
          </List.Accordion>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'relative',
    // This container now has an explicit width, height, and margins.
  },
  dropdownWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-start', // Center vertically if desired
    alignItems: 'center',         // Center horizontally
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
  },
  container: {
    backgroundColor: 'transparent',
  },
  accordion: {
    backgroundColor: '#20194D',
    padding: 0,
  },
  accordionHeader: {
    backgroundColor: '#20194D',
  },
  titleText: {
    color: '#fff',
    textAlign: 'left',
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 50,
  },
  scrollContainer: {
    maxHeight: 142,
    backgroundColor: '#20194D',
  },
  item: {
    backgroundColor: '#20194D',
  },
  icon: {
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 50,
  },
  itemText: {
    color: '#fff',
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 50,
  },
  selectedItem: {
    // A lighter background overlay with slight opacity
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    // Fully rounded corners
    borderRadius: 9999,
    // A subtle padding to create an overlay effect
    padding: 0.5,
  },
});

export default DropdownMenu;
