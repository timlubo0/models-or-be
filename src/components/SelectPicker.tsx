import React from "react";
import { View, ScrollView  } from 'react-native';
import { Button, List, Dialog, Portal, Provider, Divider } from 'react-native-paper';

interface SelectPickerProps{
    data: Array<any>;
    isVisible: boolean;
    onPickerDismiss: () => void;
    onSelect: (value: any) => void;
}


function SelectPicker({ data, isVisible, onPickerDismiss, onSelect }: SelectPickerProps){
    return(
        <Provider>
            <View>
                <Portal>
                    <Dialog visible={isVisible} onDismiss={() => onPickerDismiss()}>
                        <Dialog.Title>Choisissez une option</Dialog.Title>
                        <Dialog.ScrollArea>
                            <ScrollView>
                                {
                                    data.map((value, index) => {
                                        return(
                                            <View key={index}>
                                                <List.Item
                                                    title={value.name}
                                                    onPress={() => onSelect(value)}
                                                />
                                                <Divider/>
                                            </View>
                                        );
                                    })
                                }
                            </ScrollView>
                        </Dialog.ScrollArea>
                        <Dialog.Actions>
                            <Button onPress={() => onPickerDismiss()}>Fermer</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </Provider>
    )
}

export default SelectPicker;