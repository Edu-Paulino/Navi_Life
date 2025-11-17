import { CalendarEvent } from '../types';

class WellnessService {
  analyzeBurnout(events: CalendarEvent[]): number {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weekEvents = events.filter(
      (event) => new Date(event.startTime) >= oneWeekAgo
    );

    const totalMeetings = weekEvents.length;
    const totalHours = weekEvents.reduce((acc, event) => {
      const duration =
        (new Date(event.endTime).getTime() - new Date(event.startTime).getTime()) /
        (1000 * 60 * 60);
      return acc + duration;
    }, 0);

    const meetingsPerDay = totalMeetings / 7;
    const hoursPerDay = totalHours / 7;

    let score = 0;
    if (meetingsPerDay > 5) score += 30;
    else if (meetingsPerDay > 3) score += 20;

    if (hoursPerDay > 8) score += 40;
    else if (hoursPerDay > 6) score += 25;

    const consecutiveDays = this.countConsecutiveBusyDays(weekEvents);
    if (consecutiveDays >= 5) score += 30;

    return Math.min(score, 100);
  }

  private countConsecutiveBusyDays(events: CalendarEvent[]): number {
    const eventsByDay: { [key: string]: number } = {};
    
    events.forEach((event) => {
      const day = new Date(event.startTime).toDateString();
      eventsByDay[day] = (eventsByDay[day] || 0) + 1;
    });

    let maxConsecutive = 0;
    let currentConsecutive = 0;

    const sortedDays = Object.keys(eventsByDay).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    sortedDays.forEach((day, index) => {
      if (eventsByDay[day] >= 3) {
        currentConsecutive++;
        maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
      } else {
        currentConsecutive = 0;
      }
    });

    return maxConsecutive;
  }

  suggestBreaks(events: CalendarEvent[]): string[] {
    const suggestions: string[] = [];
    const now = new Date();

    events.forEach((event, index) => {
      if (index < events.length - 1) {
        const nextEvent = events[index + 1];
        const gap =
          (new Date(nextEvent.startTime).getTime() - new Date(event.endTime).getTime()) /
          (1000 * 60);

        if (gap < 15 && gap > 0) {
          suggestions.push(
            `Considere adicionar uma pausa de 15 minutos entre ${event.title} e ${nextEvent.title}`
          );
        }
      }
    });

    return suggestions;
  }

  identifyPostponableMeetings(events: CalendarEvent[]): string[] {
    return events
      .filter((event) => event.priority === 'low' && !event.isFocusBlock)
      .map((event) => event.id);
  }
}

export default new WellnessService();
