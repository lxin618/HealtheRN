import React from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';

export const INDEX_VALUE_MAPINNG = ['Yes', "Don't know", 'No'];
// this has to match the previous array to convert the index to the bool to save in db
export const INDEX_VALUE_KEY_MAPINNG = [true, null, false];

export const renderTabs = (
    onChange: ((index: number) => void) | undefined,
    value: number | undefined
) => {
    return (
        <SegmentedControlTab
            tabsContainerStyle={{
                marginTop: 10,
                height: 55,
            }}
            tabStyle={{
                borderColor: '#E6E6EE',
            }}
            tabTextStyle={{
                color: '#070651',
            }}
            activeTabStyle={{
                backgroundColor: '#4D9FFF',
            }}
            activeTabTextStyle={{
                color: '#fff',
            }}
            values={INDEX_VALUE_MAPINNG}
            selectedIndex={value}
            onTabPress={onChange}
        />
    );
};
