import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, FlatListProps, StyleSheet, TouchableOpacity, View } from 'react-native';
import Txt from '../components/Txt';
import COLOR from '../utils/ColorConstant';


interface Option {
    label: string | null;
    value: string | number;
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
    const [selectedItems, setSelectedItems] = useState(props?.value ? [props?.value] : []);
    const [options, setOptions] = useState(props?.options || []);
    const isMultiple = true === props?.multiple;
    const onItemPress = (item: Option) => {
        if (true !== isMultiple) {
            setSelectedItems([item?.value]);
        }
        if (true === isMultiple) {
            if (!selectedItems.includes(item?.value)) {
                setSelectedItems(items => [...items, item.value]);
            } else {
                setSelectedItems(items => [...items].filter(filterItem => filterItem !== item?.value));
            }
        }
    }
    useEffect(() => {
        props?.onSelect && props?.onSelect(false === isMultiple && selectedItems.length > 0 ? selectedItems[0] : selectedItems);
    }, [selectedItems]);
    useEffect(() => {
        setOptions(props?.options);
    }, [props?.options]);
    return (
        <View className='flex-row items-center flex-wrap gap-x-2 gap-y-2' style={[props.contentContainerStyle]}>
            {options.map((item, index) => (
                <TouchableOpacity
                    className='px-5 py-2 rounded-lg'
                    key={`input_hs_${index}`}
                    onPress={() => onItemPress(item)}
                    style={[
                        { backgroundColor: selectedItems.includes(item?.value) ? props.color || COLOR.GRAY_65 : COLOR.NEUTRAL_900 }
                    ]}
                >
                    <Txt
                        numberOfLines={1}
                        fontWeight={selectedItems.includes(item?.value) ? 700 : 400}
                        fontColor={selectedItems.includes(item?.value) ? "brandLight" : "brandDark"}
                        style={styles.itemLabel}
                    >
                        {item?.label}
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