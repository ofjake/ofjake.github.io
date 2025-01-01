// Example article data
const articles = [
  {
    id: 1,
    title: "There is only change",
    url: "There-is-only-change.html",
    tags: ["marketing", "affirmation"],
  },
  {
    id: 2,
    title: "Email Marketing UI 101",
    url: "Email-marketing-UI-101.html",
    tags: ["email", "marketing", "UI"],
  },
  {
    id: 3,
    title: "Email Campaign Automation",
    url: "Email-Campaign-Automation.html",
    tags: ["email", "marketing", "automation"],
  },
];

// Get main article data
const mainArticle = document.getElementById("main-article");
const mainArticleTags = mainArticle.dataset.tags.split(",");
const mainArticleId = parseInt(mainArticle.dataset.id, 10); // Main article ID

// Find related articles with ranking, excluding the current article
function findRelatedArticlesWithRanking(tags, currentId) {
  const relatedArticles = articles
    .filter(article => article.id !== currentId) // Exclude current article
    .map(article => {
      const matchCount = article.tags.filter(tag => tags.includes(tag)).length;
      return { ...article, matchCount };
    })
    .filter(article => article.matchCount > 0) // Keep articles with at least one matching tag
    .sort((a, b) => b.matchCount - a.matchCount); // Sort by highest match count

  console.log("Filtered and Ranked Articles:", relatedArticles); // Debugging line
  return relatedArticles;
}

// Display a single recommendation (top-ranked)
function displaySingleRecommendation(relatedArticles) {
  const recommendationList = document.getElementById("recommendation-list");
  recommendationList.innerHTML = ""; // Clear existing content

  if (relatedArticles.length > 0) {
    const topArticle = relatedArticles[0]; // Get the top-ranked article

    const recommendationItem = document.createElement("div");

    // Article title link
    const titleLink = document.createElement("a");
    titleLink.href = topArticle.url;
    titleLink.textContent = topArticle.title;
    titleLink.style.fontWeight = "bold"; // Optional styling
    recommendationItem.appendChild(titleLink);

    recommendationList.appendChild(recommendationItem);
  } else {
    recommendationList.textContent = "No related articles found.";
  }
}

// Fetch and display a single related article
const relatedArticles = findRelatedArticlesWithRanking(mainArticleTags, mainArticleId);
displaySingleRecommendation(relatedArticles);