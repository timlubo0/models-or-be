import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

interface DotsProps{
    value: number;
    active: number;
}

const Dots = ({ value, active }: DotsProps) => {
    const theme = useTheme();
    let items: number[] = [];

    for (let index = 0; index < value; index++) {
        items.push(index);
        
    }

    return(
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {
                items.map((item) => {

                    const bgColor: string = active === item ? theme.colors.primary : "#BDBDBD";
                    const width: number = active === item ? 28 : 12;

                    return(
                        <View key={item} style={{ width: width, height: 12, backgroundColor: bgColor, margin: 2, borderRadius: 20 }}/>
                    )
                })
            }
        </View>
    )

}

export default Dots;