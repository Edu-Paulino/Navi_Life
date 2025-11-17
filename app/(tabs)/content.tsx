import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, X, ExternalLink } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';

export default function ContentScreen() {
  const [topics, setTopics] = useState(['Mercado Financeiro', 'Tecnologia', 'Música']);
  const [newTopic, setNewTopic] = useState('');

  const mockArticles = [
    {
      id: '1',
      title: 'Bolsas sobem com expectativa de corte de juros',
      summary: 'Mercados globais reagem positivamente às sinalizações do Fed sobre política monetária.',
      source: 'Bloomberg',
      category: 'Mercado Financeiro',
    },
    {
      id: '2',
      title: 'Apple anuncia novo chip revolucionário',
      summary: 'Novo processador promete dobrar o desempenho mantendo eficiência energética.',
      source: 'TechCrunch',
      category: 'Tecnologia',
    },
    {
      id: '3',
      title: 'Festival de música reúne grandes nomes',
      summary: 'Evento anual traz artistas internacionais e promete maior edição da história.',
      source: 'Rolling Stone',
      category: 'Música',
    },
  ];

  const handleAddTopic = () => {
    if (newTopic.trim() && !topics.includes(newTopic.trim())) {
      setTopics([...topics, newTopic.trim()]);
      setNewTopic('');
    }
  };

  const handleRemoveTopic = (topic: string) => {
    setTopics(topics.filter((t) => t !== topic));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Curadoria</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topicsSection}>
          <Text style={styles.sectionTitle}>Seus Tópicos de Interesse</Text>
          <View style={styles.topicsList}>
            {topics.map((topic) => (
              <View key={topic} style={styles.topicChip}>
                <Text style={styles.topicText}>{topic}</Text>
                <Pressable onPress={() => handleRemoveTopic(topic)}>
                  <X size={18} color={Colors.white} />
                </Pressable>
              </View>
            ))}
          </View>

          <View style={styles.addTopicContainer}>
            <TextInput
              style={styles.topicInput}
              placeholder="Adicionar novo tópico"
              value={newTopic}
              onChangeText={setNewTopic}
              onSubmitEditing={handleAddTopic}
            />
            <Pressable style={styles.addTopicButton} onPress={handleAddTopic}>
              <Plus size={20} color={Colors.white} />
            </Pressable>
          </View>
        </View>

        <View style={styles.digestSection}>
          <View style={styles.digestHeader}>
            <Text style={styles.sectionTitle}>Resumo Diário</Text>
            <Text style={styles.digestTime}>Configurado para 09:00</Text>
          </View>

          {mockArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ArticleCard({ article }: any) {
  return (
    <Pressable style={styles.articleCard}>
      <View style={styles.articleHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{article.category}</Text>
        </View>
        <ExternalLink size={18} color={Colors.text.secondary} />
      </View>
      <Text style={styles.articleTitle}>{article.title}</Text>
      <Text style={styles.articleSummary}>{article.summary}</Text>
      <Text style={styles.articleSource}>{article.source}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
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
  scrollContent: {
    padding: 15,
  },
  topicsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  topicsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  topicChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  topicText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.white,
  },
  addTopicContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  topicInput: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: Fonts.regular,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  addTopicButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  digestSection: {
    marginBottom: 20,
  },
  digestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  digestTime: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
  },
  articleCard: {
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
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Colors.white,
  },
  articleTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.text.primary,
    marginBottom: 8,
    lineHeight: 22,
  },
  articleSummary: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  articleSource: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Colors.primary,
  },
});
