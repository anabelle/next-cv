import { style, globalStyle } from '@vanilla-extract/css';
import { atoms } from '../strum-design-system/sprinkles.css';
import colors from '../strum-design-system/themes/timbre/colors';
import spacers from '../strum-design-system/themes/timbre/spacers';
import { rgba } from 'polished';

// Helper for atoms, may need adjustment based on actual spacer/size values
const mapSpacer = (n) => spacers[n] || n;

export const sectionStyle = atoms({
  marginTop: 6,
});

// Define light and dark theme styles
export const lightThemeClass = style({
  color: colors.black, // Black for light mode
});

export const darkThemeClass = style({
  color: colors.white, // White for dark mode
});

// Apply the text color globally
export const sectionTitleStyle = style([
  {
    fontSize: '1.25rem',
    fontWeight: 700,
    alignItems: 'center',
    gap: '8px',
  },
]);

export const titleIconStyle = style({
  color: colors.primary, // Use defined primary color
  marginRight: '0.5rem',
});

// Style for the card container (no longer a link)
export const projectCardNonLink = style([
  atoms({
    // display: 'block', // Removed display: block
    borderRadius: 'rounded',
  }),
  {
    overflow: 'hidden',
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    marginBottom: mapSpacer(4),
    // Add flex properties to control width within the flex container
    flex: '1 1 calc(50% - 0.75rem)', // Grow/shrink from 50% minus half the gap
    maxWidth: 'calc(50% - 0.75rem)', // Ensure it doesn't exceed this width initially
    // Add a minWidth for very small screens if needed, e.g.:
    // minWidth: '280px',
  },
]);

// Featured card should span full width of the container
export const projectCardFeatured = style([
  atoms({ borderRadius: 'rounded' }),
  {
    overflow: 'hidden',
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    marginBottom: mapSpacer(4),
    flex: '1 1 100%',
    maxWidth: '100%',
    position: 'relative',
  },
]);

export const imageBannerStyle = style([
  atoms({
    // position: 'relative', // Moved to plain style
    // width: 'full', // Moved to plain style
    // overflow: 'hidden', // Moved to plain style
    backgroundColor: 'dark',
  }),
  {
    position: 'relative', // Plain CSS
    overflow: 'hidden', // Plain CSS
    height: '176px', // Increased height by 80px (96 + 80)
    width: '100%', // Plain CSS for full width
  },
]);

// Taller banner for featured card
export const imageBannerFeaturedStyle = style([
  atoms({ backgroundColor: 'dark' }),
  {
    position: 'relative',
    overflow: 'visible',
    height: '240px',
    width: '100%',
  },
]);

// Circle avatar overlay for featured card
export const featuredAvatarWrapper = style({
  position: 'absolute',
  bottom: '-32px',
  right: '24px',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  overflow: 'hidden',
  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
  border: '3px solid rgba(255, 255, 255, 0.9)',
  backgroundColor: '#111',
  zIndex: 10,
});

export const featuredAvatarImg = style({
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

// Using globalStyle for img within banner
globalStyle(`${imageBannerStyle} > img`, {
  display: 'block',
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  objectPosition: 'center',
  // filter: 'brightness(0.95)', // Removed brightness filter
  transition: 'transform 0.3s ease', // Changed transition
});

globalStyle(`${projectCardNonLink}:hover ${imageBannerStyle} > img`, {
  // filter: 'brightness(1)', // Removed brightness change
  transform: 'scale(1.03)', // Add subtle scale effect on hover instead
});

// Style for the Title (now a span again)
export const imageTitleStyle = style([
  atoms({
    color: 'white', // Keep color white
  }),
  {
    fontWeight: 600,
    fontSize: '1rem',
    display: 'block',
  },
]);

export const contentAreaStyle = style([
  atoms({
    padding: 3,
    display: 'flex',
  }),
  {
    backgroundColor: rgba(0, 0, 0, 0.99), // ADDED semi-transparent background here
    flexDirection: 'column',
    gap: mapSpacer(2),
    position: 'relative',
    zIndex: 1,
  },
]);

export const techListStyle = style([
  atoms({
    display: 'flex',
    // flexWrap: 'wrap', // Not in atoms
    // gap: '1.5', // Not a valid spacer/atom value? Use fixed px
  }),
  {
    flexWrap: 'wrap',
    gap: mapSpacer(1.5) || '6px', // Approx 1.5 spacer or fallback
  },
]);

export const techTagStyle = style([
  atoms({
    backgroundColor: 'dark',
    color: 'light',
    paddingX: 1, // Use spacer key 1 (adjust if needed)
    paddingY: 1, // Use spacer key 1 (adjust if needed)
    borderRadius: 'rounded',
  }),
  {
    fontSize: '10px',
    lineHeight: '1',
  },
]);

export const descriptionStyle = style([
  atoms({
    // fontSize: 'xs', // Not in atoms
    color: 'light', // Use defined 'light' color
  }),
  {
    fontSize: '0.75rem', // xs
    margin: 0, // Reset default paragraph margin
  },
]);

// Style for the View Live Demo text/icon (now a span)
export const viewLinkStyle = style([
  atoms({
    display: 'block', // Keep display: block from atoms
    color: 'white',
    paddingY: 1,
  }),
  {
    display: 'inline-flex', // Keep inline-flex for alignment
    alignItems: 'center',
    gap: mapSpacer(1),
    fontSize: '0.75rem',
    fontWeight: 500,
  },
]);

export const viewLinkIconStyle = style({
  width: '10px',
  height: '10px',
});

// Style for the main Carousel container (optional, for custom overrides)
// export const carouselContainer = style({
//   // Example: Add specific margin if needed
// });

// Style for each slide within the carousel
// export const carouselSlide = style({
//   padding: `0 ${mapSpacer(1)}`, // Add some horizontal space between slides if desired
//   // Ensure card inside has necessary styles but not fixed width
// });

// Add this new style for the container
export const projectContainerStyle = style({
  display: 'flex',
  flexWrap: 'wrap', // Allow wrapping on smaller screens
  gap: '1.5rem', // Spacing between cards
  justifyContent: 'center', // Center the cards if space allows
  marginTop: '2rem',
});
