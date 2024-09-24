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
    const renderItem = useCallback(({ item }: { item: Option}) => {
        return (
            <TouchableOpacity onPress={() => onItemPress(item)} className='bg-neutral-400 mr-[10px] py-[10px] px-[25px] rounded-[4px]' style={[{backgroundColor: selectedItems.includes(item?.value) ? props.color || COLOR.GRAY_65 : COLOR.NEUTRAL_900}]}>
                <Txt numberOfLines={1} fontWeight={selectedItems.includes(item?.value)? 700 : 400} fontColor={selectedItems.includes(item?.value)? "brandLight" : "brandDark"} style={styles.itemLabel}>{item?.label}</Txt>
            </TouchableOpacity>
        );
    },
    [selectedItems, props.color]
);
    useEffect(() => {
        props?.onSelect && props?.onSelect(false === isMultiple && selectedItems.length > 0 ? selectedItems[0] : selectedItems);
    }, [selectedItems]);
    useEffect(() => {
        setOptions(props?.options);
    }, [props?.options]);
    return (
        <View>
            <FlatList
                contentContainerStyle={[props.contentContainerStyle]}
                horizontal={true}
                data={options}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => "input_hs_"+index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    itemLabel: {
        color: COLOR.BLACK_60
    }
})