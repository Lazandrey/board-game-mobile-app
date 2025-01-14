import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { PropsWithChildren, useState } from "react";
import React from "react";
import ThemedText from "./ThemedText";
import { CustomDarkTheme } from "@/app/_layout";
import { Ionicons } from "@expo/vector-icons";

type FormFieldProps = PropsWithChildren<{
  title: string;
  value: string;
  placeholder: string;
  onTextChange: (text: string) => void;
}> &
  React.ComponentProps<typeof TextInput>;
const FormField = ({
  title,
  value,
  placeholder,
  onTextChange,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.formField}>
      <ThemedText style={styles.labelText}>{title}</ThemedText>
      <View style={styles.formFieldInputWrapper}>
        <TextInput
          style={styles.formFieldInput}
          placeholder={placeholder}
          placeholderTextColor={CustomDarkTheme.colors.text}
          value={value}
          onChangeText={onTextChange}
          secureTextEntry={
            title.toLocaleLowerCase().includes("password") && !showPassword
          }
          {...props}
        ></TextInput>
        {title.toLocaleLowerCase().includes("password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Ionicons
                style={styles.showPasswordIcon}
                name="eye-off"
                size={28}
                color={CustomDarkTheme.colors.text}
              />
            ) : (
              <Ionicons
                style={styles.showPasswordIcon}
                name="eye"
                size={28}
                color={CustomDarkTheme.colors.text}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  formField: {
    width: "100%",

    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  formFieldInputWrapper: {
    width: "100%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.primary,
    backgroundColor: CustomDarkTheme.colors.card,
    borderRadius: 6,
  },
  formFieldInput: {
    flex: 1,
    paddingLeft: 10,
    color: CustomDarkTheme.colors.text,
    fontSize: 20,
  },
  showPasswordIcon: {
    right: 10,
  },
  labelText: {
    fontSize: 20,
  },
});
