import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

type ParamList = {
    [key: string]: object | undefined;
};

export interface NaviProps {
    navigation: NavigationProp<ParamListBase>;
    route?: RouteProp<ParamList, string>;
}

// export declare type NaviProps {
//     navigation: NavigationProp<ParamList, RouteName>;
//     route?: RouteProp<ParamList, RouteName>;
// };
