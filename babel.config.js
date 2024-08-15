module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
                root: ['.'],
                alias: {
                    '@components': './src/components',
                    // '@hooks': './src/hooks/index',
                    // "@images": './src/assets/images/index',
                },
            },
        ],
        "nativewind/babel"
    ],
};
