import { StyleSheet } from "react-native";
import { colors } from "../../css/color";
import { iosShadow } from "../../css/shadow";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.bg.primary,
		flex: 1,
	},
	innerContainer: {
		backgroundColor: colors.bg.primary,
		marginTop: 35,
		marginHorizontal: 40,
		marginBottom: 20,
		gap: 10,
	},
	headerContainer: {
		backgroundColor: colors.bg.primary,
		paddingHorizontal: 18,
		paddingTop: 50,
	},
	flatListBuffer: {
		paddingBottom: 50,
	},
	// Rendered as ListFooterComponent -- part of the list's actual scrollable
	// content, not an absolutely-positioned overlay, so it lands immediately
	// after the real last row regardless of how much taller the surrounding
	// flex:1 container is than the list's content. Covers
	// DraggableFlatList's post-reorder duplicate-item glitch, which shows up
	// right there. Solid black, same as the screen's own background, so it
	// reads as nothing rather than a visible cover. See useReorderMask.tsx.
	reorderMask: {
		height: 120,
		backgroundColor: colors.bg.primary,
	},
	titleContainer: {
		flex: 1,
		paddingHorizontal: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		paddingTop: 5,
		fontFamily: "Syncopate_700Bold",
		color: colors.text.accentDark,
		fontSize: 20,
		textAlign: "center",
	},
	titleRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
	titleRowLeft: {
		width: 40,
		alignItems: "flex-start",
	},
	titleRowRight: {
		width: 40,
		marginTop: 6,
		alignItems: "center",
	},
	infoText: {
		fontFamily: "Play_400Regular",
		fontSize: 25,
		color: colors.text.muted,
		textAlign: "center",
		marginTop: 20,
	},
	inputWrapper: {
		backgroundColor: colors.bg.input,
		borderRadius: 18,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		height: 50,
		marginBottom: 20,
		elevation: 8,
	},
	inputText: {
		color: colors.text.input,
		fontFamily: "Play_400Regular",
		fontSize: 16,
		flex: 1,
	},
	// Shared by inputWrapper and descriptionWrapper below. elevation stays on
	// the wrapper, never here: toggling elevation on Android forces a relayout
	// that steals focus back off the TextInput the instant it's gained, so it
	// has to be a constant, not something added when focused. iosShadow is
	// inert on Android (returns {}), so it's safe here -- it's what makes the
	// shadow iOS-only-appear on focus without touching Android at all.
	inputFocused: {
		backgroundColor: colors.bg.inputHighlight,
		...iosShadow(8, colors.shadow.primary),
	},
	inputPlaceholder: {
		fontFamily: "Play_400Regular",
		color: colors.text.muted,
		fontSize: 16,
		position: "absolute",
		left: 18,
		top: 13,
	},
	descriptionWrapper: {
		backgroundColor: colors.bg.input,
		borderRadius: 18,
		paddingHorizontal: 16,
		minHeight: 50,
		maxHeight: 150,
		elevation: 8,
	},
	descriptionInput: {
		color: colors.text.input,
		fontFamily: "Play_400Regular",
		fontSize: 16,
	},
	descriptionPlaceholder: {
		color: colors.text.muted,
		fontFamily: "Play_400Regular",
		fontSize: 16,
		position: "absolute",
		left: 18,
		top: 13,
	},
});
