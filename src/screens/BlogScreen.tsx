// ─── src/screens/BlogScreen.tsx ─────────────────────────────────────────

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS } from '../constants/typography';
import { FadeInView } from '../components/common/FadeInView';
import { BLOG_POSTS, BlogPost, BlogCategory } from '../data/blogPosts';
import { MboaButton } from '../components/common/MboaButton';
import { useSwipeTabs } from '../hooks/useSwipeTabs';

const CATEGORIES: { key: BlogCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'eat_smart', label: 'Eat Smart' },
  { key: 'move_smart', label: 'Move Smart' },
  { key: 'mboa_stories', label: 'Mboa Stories' },
];

const CATEGORY_LABELS: Record<BlogCategory, string> = {
  eat_smart: 'Eat Smart',
  move_smart: 'Move Smart',
  mboa_stories: 'Mboa Stories',
};

const CATEGORY_COLORS: Record<BlogCategory, string> = {
  eat_smart: Colors.mboaGreen,
  move_smart: Colors.mboaGreen,
  mboa_stories: Colors.zenGold,
};

// ─── BLOG POST MODAL ────────────────────────────────────────────────────

const BlogPostModal = ({
  post,
  visible,
  onClose,
}: {
  post: BlogPost | null;
  visible: boolean;
  onClose: () => void;
}) => {
  if (!post) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.modalCloseText}>✕</Text>
          </TouchableOpacity>

          <ScrollView
            style={styles.modalScroll}
            contentContainerStyle={styles.modalScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={[
                styles.modalCategoryBadge,
                { backgroundColor: CATEGORY_COLORS[post.category] },
              ]}
            >
              <Text style={styles.modalCategoryBadgeText}>
                {CATEGORY_LABELS[post.category]}
              </Text>
            </View>

            <Text style={styles.modalTitle}>{post.title}</Text>
            <Text style={styles.modalReadTime}>{post.readTime}</Text>

            <View style={styles.modalDivider} />

            <Text style={styles.modalContent}>{post.content}</Text>

            <View style={{ height: 40 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// ─── BLOG CARD ──────────────────────────────────────────────────────────

const BlogCard = ({
  post,
  onPress,
}: {
  post: BlogPost;
  onPress: (post: BlogPost) => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.blogCard}
      onPress={() => onPress(post)}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.categoryBadge,
          {
            backgroundColor: CATEGORY_COLORS[post.category],
            borderBottomColor:
              post.category === 'mboa_stories'
                ? Colors.mboaGreen
                : Colors.zenGold,
          },
        ]}
      >
        <Text style={styles.categoryBadgeText}>
          {CATEGORY_LABELS[post.category]}
        </Text>
      </View>

      <Text style={styles.blogTitle}>{post.title}</Text>
      <Text style={styles.blogSummary}>{post.summary}</Text>

      <View style={styles.blogFooter}>
        <Text style={styles.blogReadTime}>{post.readTime}</Text>
      </View>

      <View style={styles.blogReadMoreBadge}>
        <Text style={styles.blogReadMoreText}>Read →</Text>
      </View>

    </TouchableOpacity>
  );
};

// ─── MAIN BLOG SCREEN ───────────────────────────────────────────────────

const BlogScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const panHandlers = useSwipeTabs();

  // Scroll-to-top
  const scrollRef = useRef<any>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setShowScrollTop(y > 400);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const filteredPosts =
    selectedCategory === 'all'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  const openPost = (post: BlogPost) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const closePost = () => {
    setModalVisible(false);
    setSelectedPost(null);
  };

  return (
    <FadeInView style={styles.container} {...panHandlers}>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ width: '100%' }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerArea}>
          <Text style={styles.eyebrow}>LEARN</Text>
          <Text style={styles.header}>Mboa-Zen Blog</Text>
          <Text style={styles.subHeader}>
            Practical health, food, and workout advice for real Cameroonian life.
          </Text>

          {/* Category Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {CATEGORIES.map((cat) => (
              <MboaButton
                key={cat.key}
                title={cat.label}
                onPress={() => setSelectedCategory(cat.key)}
                variant={selectedCategory === cat.key ? 'primary' : 'outline'}
                style={{ marginRight: 8 }}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          {filteredPosts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No articles yet</Text>
              <Text style={styles.emptySubtitle}>
                Check back soon for new content.
              </Text>
            </View>
          ) : (
            filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} onPress={openPost} />
            ))
          )}

          <View style={styles.disclaimerBox}>
            <Text style={styles.disclaimerText}>
              These articles are for general wellness education only. Consult a
              qualified health professional for personal medical advice.
            </Text>
          </View>

          <View style={{ height: 20 }} />
        </View>
      </ScrollView>

      <BlogPostModal
        post={selectedPost}
        visible={modalVisible}
        onClose={closePost}
      />

      {/* ─── SCROLL TO TOP BUTTON ────────────────────────────────────── */}
      {showScrollTop && (
        <TouchableOpacity
          style={styles.scrollTopButton}
          onPress={scrollToTop}
          activeOpacity={0.8}
        >
          <Text style={styles.scrollTopArrow}>↑</Text>
        </TouchableOpacity>
      )}
    </FadeInView>
  );
};

// ─── STYLES ─────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softBg, alignItems: 'center' },
  headerArea: {
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
    backgroundColor: Colors.softBg,
  },
  eyebrow: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 3,
    marginBottom: 6,
  },
  header: {
    fontSize: 24,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textMuted,
    lineHeight: 20,
    marginBottom: 16,
  },
  categoryRow: { paddingBottom: 8, gap: 8 },

  scrollContent: { width: '100%', alignItems: 'center', paddingTop: 8 },
  section: {
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  blogCard: {
    backgroundColor: Colors.cleanWhite,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    borderBottomWidth: 3,
    marginBottom: 12,
  },
  categoryBadgeText: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    letterSpacing: 0.5,
  },
  blogTitle: {
    fontSize: 18,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 8,
    lineHeight: 24,
  },
  blogSummary: {
    fontSize: 14,
    ...FONTS.regular,
    color: Colors.textMuted,
    lineHeight: 21,
    marginBottom: 14,
  },
  blogFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blogReadTime: {
    fontSize: 12,
    ...FONTS.medium,
    color: Colors.textMuted,
  },
  blogReadMore: {
    fontSize: 13,
    ...FONTS.bold,
    color: Colors.mboaGreen,
  },

  emptyState: { paddingVertical: 60, alignItems: 'center' },
  emptyTitle: {
    fontSize: 18,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    ...FONTS.regular,
    color: Colors.textMuted,
    textAlign: 'center',
  },

  disclaimerBox: {
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: Colors.zenGold,
  },
  disclaimerText: {
    fontSize: 12,
    ...FONTS.regular,
    color: Colors.earthBlack,
    lineHeight: 18,
  },

  // ─── MODAL STYLES ─────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.cleanWhite,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    minHeight: '60%',
    paddingTop: 16,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 12,
    right: 16,
    zIndex: 10,
    backgroundColor: Colors.softBg,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontSize: 18,
    ...FONTS.bold,
    color: Colors.earthBlack,
  },
  modalScroll: { width: '100%' },
  modalScrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  modalCategoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 14,
  },
  modalCategoryBadgeText: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    letterSpacing: 0.5,
  },
  modalTitle: {
    fontSize: 24,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 8,
    lineHeight: 32,
  },
  modalReadTime: {
    fontSize: 13,
    ...FONTS.medium,
    color: Colors.textMuted,
    marginBottom: 16,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 20,
  },
  modalContent: {
    fontSize: 15,
    ...FONTS.regular,
    color: Colors.earthBlack,
    lineHeight: 26,
  },

  blogReadMoreBadge: {
    backgroundColor: Colors.mboaGreen,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 50,
    borderBottomWidth: 2,
    borderBottomColor: Colors.zenGold,
    alignSelf: 'flex-end',
  },

  blogReadMoreText: {
    fontSize: 12,
    ...FONTS.bold,
    color: Colors.cleanWhite,
  },

  // ─── SCROLL TO TOP ─────────────────────────────────────────────────────
  scrollTopButton: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.mboaGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: Colors.zenGold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 999,
  },
  scrollTopArrow: {
    fontSize: 24,
    ...FONTS.bold,
    color: Colors.cleanWhite,
  },
});

export default BlogScreen;

