import { Text, TextProps } from "react-native";
import { useTheme } from "@react-navigation/native";
export type ThemedTextProps = TextProps & {
  children: React.ReactNode;
  style?: object;
};
const ThemedText = ({ children, style, ...rest }: ThemedTextProps) => {
  const { colors } = useTheme();

  return (
    <Text style={[{ color: colors.text }, style]} {...rest}>
      {children}
    </Text>
  );
};

export default ThemedText;
