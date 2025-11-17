import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { Plus, Clock, MapPin } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function AgendaScreen() {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const mockEvents = [
    {
      id: '1',
      title: 'Reunião com Cliente',
      time: '09:00 - 10:00',
      location: 'Sala de Conferências',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Bloco de Foco - Desenvolvimento',
      time: '10:30 - 12:30',
      location: 'Home Office',
      priority: 'high',
      isFocusBlock: true,
    },
    {
      id: '3',
      title: 'Almoço com Equipe',
      time: '12:30 - 13:30',
      location: 'Restaurante Central',
      priority: 'medium',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Agenda</Text>
        <Pressable style={styles.addButton}>
          <Plus size={24} color={Colors.white} />
        </Pressable>
      </View>

      <ScrollView>
        <View style={styles.calendarContainer}>
          <Calendar
            current={selectedDate}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: Colors.primary,
              },
            }}
            theme={{
              selectedDayBackgroundColor: Colors.primary,
              todayTextColor: Colors.secondary,
              arrowColor: Colors.primary,
              textMonthFontFamily: Fonts.semiBold,
              textDayFontFamily: Fonts.regular,
              textDayHeaderFontFamily: Fonts.medium,
            }}
          />
        </View>

        <View style={styles.eventsContainer}>
          <View style={styles.prioritiesSection}>
            <Text style={styles.sectionTitle}>Prioridades da Semana</Text>
            <View style={styles.prioritiesList}>
              <PriorityChip text="Finalizar Projeto X" />
              <PriorityChip text="Preparar Apresentação" />
              <PriorityChip text="Review de Código" />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Eventos de Hoje</Text>
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function EventCard({ event }: any) {
  return (
    <Pressable
      style={[
        styles.eventCard,
        event.isFocusBlock && styles.focusBlockCard,
      ]}
    >
      <View style={styles.eventHeader}>
        <View
          style={[
            styles.priorityDot,
            { backgroundColor: event.priority === 'high' ? Colors.accent.red : Colors.accent.yellow },
          ]}
        />
        <Text style={styles.eventTitle}>{event.title}</Text>
      </View>
      <View style={styles.eventDetails}>
        <View style={styles.eventDetail}>
          <Clock size={16} color={Colors.text.secondary} />
          <Text style={styles.eventDetailText}>{event.time}</Text>
        </View>
        <View style={styles.eventDetail}>
          <MapPin size={16} color={Colors.text.secondary} />
          <Text style={styles.eventDetailText}>{event.location}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function PriorityChip({ text }: { text: string }) {
  return (
    <View style={styles.priorityChip}>
      <Text style={styles.priorityChipText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    backgroundColor: Colors.white,
    margin: 15,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  eventsContainer: {
    padding: 15,
  },
  prioritiesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  prioritiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  priorityChip: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  priorityChipText: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Colors.white,
  },
  eventCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  focusBlockCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.text.primary,
    flex: 1,
  },
  eventDetails: {
    gap: 6,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventDetailText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
  },
});
