// @flow
import * as React from "react"
import { SafeAreaView, View, ActivityIndicator } from "react-native"

import type { ViewType } from "../types"
// styles
import { Colors, Metrics } from "../themes"

// utils
import renderStyle from "../utils/renderStyle"

export type ContainerProps = {
  children?: React.Node,
  style?: ViewType,
  theme?: string,
  stretched?: boolean,
  loading: boolean,
}

const styles = {
  outerWrapper: {
    flex: 1,
  },
  container: ({ stretched, theme }) => {
    const spacings = stretched
      ? { paddingHorizontal: 0, paddingTop: 0 }
      : {
          paddingHorizontal: Metrics.spacings.medium,
          paddingTop: Metrics.spacings.medium,
        }
    return {
      backgroundColor: theme,
      flex: 1,
      ...spacings,
    }
  },
  spinner: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
}

export default class Container extends React.Component<ContainerProps> {
  static defaultProps = {
    stretched: false,
    theme: Colors.background,
    style: {},
    children: null,
  }

  render() {
    const { children, stretched, style, theme, loading } = this.props

    return (
      <SafeAreaView style={styles.outerWrapper}>
        <View
          style={[renderStyle(styles.container, { stretched, theme }), style]}
        >
          {loading ? (
            <View style={styles.spinner}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            children
          )}
        </View>
      </SafeAreaView>
    )
  }
}
