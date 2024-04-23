import React from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';

export const INDEX_VALUE_MAPINNG = ['Yes', "Don't know", 'No'];

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
                borderColor: '#4D9FFF',
                backgroundColor: '#F2F8FF',
            }}
            activeTabTextStyle={{
                color: '#0076FF',
            }}
            values={INDEX_VALUE_MAPINNG}
            selectedIndex={value}
            onTabPress={onChange}
        />
    );
};
