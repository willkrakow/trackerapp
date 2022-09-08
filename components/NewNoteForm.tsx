import { View } from "../components/Themed";
import { useState } from "react";
import { Input } from "@rneui/themed";
import { Note } from '../entities/note';
import { useDatabase } from "../entities/db";
import VariantButton from "./Button";

interface INewNoteForm {
  onSuccess: () => void;
}
const NewNoteForm = ({ onSuccess }: INewNoteForm) => {
  const [formValue, setFormValue] = useState<any>({
    title: '',
    text: '',
  });
  const db = useDatabase();
  const handleSubmit = async () => {
    console.log(formValue);
    try {
        const result = await db.manager.insert(Note, formValue)
        console.log(result);
        onSuccess();
    } catch(err){
        console.log(err)
    }
  }

  return (
    <View style={{ flex: 1 }}>
        <Input label="Title" value={formValue.title} onChangeText={(text) => setFormValue({...formValue, title: text})} />
        <Input label="Note" value={formValue.text} onChangeText={(text) => setFormValue({...formValue, text: text})} />
        <VariantButton variant="primary" onPress={handleSubmit}>Save</VariantButton>
    </View>
  );
};

export default NewNoteForm;
