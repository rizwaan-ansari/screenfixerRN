import React, { useEffect, useState } from 'react';
import { FlatListProps, StyleSheet, TouchableOpacity, View } from 'react-native';
import Txt from '../components/Txt';
import COLOR from '../utils/ColorConstant';

export interface Option {
    label: string | null;
    slug: string | number;
}

interface HorizontalSelectProps {
    options: Option[];
    value?: string | number;
    multiple?: boolean;
    onSelect?: (selectedItems: string | number | (string | number)[]) => void;
    color?: string;
    contentContainerStyle?: FlatListProps<Option>['contentContainerStyle'];
}

export default function HorizontalSelect(props: HorizontalSelectProps) {
    const [selectedItems, setSelectedItems] = useState<(string | number)[]>(props?.value ? [props?.value] : []);
    const [options, setOptions] = useState(props?.options || []);
    const isMultiple = props?.multiple === true;

    const onItemPress = (item: Option) => {
        if (!isMultiple) {
            setSelectedItems([item.slug]);
        } else {
            if (!selectedItems.includes(item.slug)) {
                setSelectedItems(items => [...items, item.slug]);
            } else {
                setSelectedItems(items => items.filter(filterItem => filterItem !== item.slug));
            }
        }
    }

    useEffect(() => {
        if (props?.onSelect) {
            const result = isMultiple ? selectedItems : (selectedItems.length > 0 ? selectedItems[0] : '');
            props.onSelect(result);
        }
    }, [selectedItems]);

    useEffect(() => {
        setOptions(props?.options);
    }, [props?.options]);

    return (
        <View className='flex-row items-center flex-wrap gap-x-2 gap-y-2' style={[props.contentContainerStyle]}>
            {options.map((item, index) => (
                <TouchableOpacity
                    className='px-5 py-3 rounded-lg'
                    key={`input_hs_${index}`}
                    onPress={() => onItemPress(item)}
                    style={[
                        { backgroundColor: selectedItems.includes(item.slug) ? props.color || COLOR.GRAY_65 : COLOR.NEUTRAL_900 }
                    ]}
                >
                    <Txt
                        numberOfLines={1}
                        fontWeight={selectedItems.includes(item.slug) ? 700 : 400}
                        fontColor={selectedItems.includes(item.slug) ? "brandLight" : "brandDark"}
                        style={styles.itemLabel}
                    >
                        {item.label}
                    </Txt>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    itemLabel: {
        color: COLOR.BLACK_60
    }
})