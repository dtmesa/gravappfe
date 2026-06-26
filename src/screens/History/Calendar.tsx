import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Calendar } from 'react-native-calendars';
import { colors } from '../../css/color';

type Props = {
    selected: string;
    setSelected: (date: string) => void;
}

export default function CalendarDisplay({ selected, setSelected }: Props) {
    return (
        <Calendar
            onDayPress={(day) => { setSelected(day.dateString) }}
            markedDates={{ [selected]: { selected: true }}}
            renderArrow={(direction) =>
                direction === 'left'
                    ? <ChevronLeft size={28} color={colors.button.accentDark} />
                    : <ChevronRight size={28} color={colors.button.accentDark} />
            }
            theme={{
                monthTextColor: colors.text.accentDark,
                textMonthFontFamily: 'Syncopate_400Regular',
                textMonthFontSize: 25,

                dayTextColor: colors.text.static,
                textDayFontFamily: 'Play_700Bold',
                textDayFontSize: 15,

                textSectionTitleColor: colors.text.accentDark,
                textDayHeaderFontFamily: 'Play_400Regular',
                textDayHeaderFontSize: 15,

                selectedDayBackgroundColor: colors.bg.inputHighlight,
                selectedDayTextColor: colors.text.accentHighlight,

                todayTextColor: colors.text.accentLight,
                textDisabledColor: colors.text.muted,

                calendarBackground: colors.bg.transparent,
            }}
        />
    );
}