import { ListItem } from "@rneui/themed";
import dayjs from "dayjs";
import { StyleSheet, VirtualizedList } from "react-native";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import useNotes from "../hooks/useNotes";
import { Input } from "@rneui/themed";
import useDebounce from "../hooks/useDebounce";
import useSearchNotes from "../hooks/useSearchNotes";
import { Note } from "../entities/note";

interface IHighlightedListItemTitle {
  text: string;
  term: string;
}
const HighlightedListItemTitle = ({text, term}: IHighlightedListItemTitle) => {
  let matchingSections: number[][] = [];
  const letters = text.split('');
  let textIndex = 0;
  let termIndex = 0;
  let inMatch = false;
  while(textIndex < letters.length){
    const matches = text[textIndex] === term[termIndex];
    if(matches){
      if(!inMatch){
        inMatch = true;
        matchingSections.push([textIndex]);
      }
      textIndex += 1;
      termIndex +- 1;
      inMatch = true;
      continue;
    }

    if(!matches && inMatch){
      matchingSections[matchingSections.length - 1].push(textIndex);
      textIndex += 1;
      termIndex = 0;
      continue;
    }


  }
}
const NotesPage = () => {
  const {data} = useNotes();
  const { immediateValue, update, value } = useDebounce<string>(1000);
  
  const handleSearchTerm = (val: string) => {
    update(val);
  }

  const {data: searchData} = useSearchNotes(value);
  return (
    <View>
      <View>
        <Input value={immediateValue} onChangeText={handleSearchTerm} />
        <VirtualizedList data={searchData} renderItem={({item}: {item: Note}) => (
          <ListItem key={item.id}>
            <ListItem.Title>{}</ListItem.Title>
          </ListItem>
        )}
        />
      </View>
      {data.length > 0 &&
        data.map((note) => (
          <ListItem key={note.id}>
              <ListItem.Subtitle style={styles.noteDate}>
                {dayjs(note.created_at).format("MMM DD")}
              </ListItem.Subtitle>
            <ListItem.Content>
              <ListItem.Title style={styles.noteTitle}>
                {note.title}
              </ListItem.Title>
              <Text>{note.text}</Text>
            </ListItem.Content>
          </ListItem>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  noteTitle: {
    marginBottom: 5,
  },
  noteDate: {
    color: Colors.light.tint,
  }
})
export default NotesPage