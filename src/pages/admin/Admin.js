import React, { Component } from "react";
import { getPortfolioData } from "../../portfolio";
import "./Admin.css";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: getPortfolioData(),
      jsonText: JSON.stringify(getPortfolioData(), null, 2),
    };
  }

  handleJsonChange = (e) => {
    this.setState({ jsonText: e.target.value });
  };

  handleSave = () => {
    try {
      const parsed = JSON.parse(this.state.jsonText);
      localStorage.setItem('portfolioData', JSON.stringify(parsed));
      this.setState({ data: parsed });
      alert("Data saved successfully! Refresh the page to see changes.");
    } catch (e) {
      alert("Invalid JSON: " + e.message);
    }
  };

  handleReset = () => {
    localStorage.removeItem('portfolioData');
    const defaultData = getPortfolioData(); // This will return default since no stored
    this.setState({ jsonText: JSON.stringify(defaultData, null, 2) });
  };

  render() {
    const theme = this.props.theme;
    return (
      <div className="admin-main" id="admin">
        <div className="admin-header-div">
          <h1 className="admin-header" style={{ color: theme.text }}>
            Admin Panel (Simple JSON Editor)
          </h1>
          <p style={{ color: theme.secondaryText }}>
            Edit your site content here. Save to localStorage, then refresh to apply.
          </p>
        </div>

        <div className="admin-info-box" style={{ borderColor: theme.imageHighlight }}>
          <h2>How to use</h2>
          <ol>
            <li>Step 1: Update the JSON in the box below.</li>
            <li>Step 2: Click <strong>Save Changes</strong>.</li>
            <li>Step 3: Refresh the app to see your updated portfolio.</li>
          </ol>
          <p>
            Tip: Make sure JSON syntax is correct; otherwise, save is rejected.
            Use an online JSON formatter if needed.
          </p>
        </div>

        <div className="admin-content">
          <div className="admin-section">
            <h3>JSON Editor</h3>
            <p className="admin-section-text">Edit the full portfolio JSON below.</p>
            <textarea
              className="admin-textarea"
              value={this.state.jsonText}
              onChange={this.handleJsonChange}
              placeholder="Edit JSON data here"
            />
          </div>

          <div className="admin-section admin-preview">
            <h3>Quick Preview</h3>
            <p className="admin-section-text">Current data snapshot from localStorage (or defaults).</p>
            <div className="preview-grid">
              <div className="preview-item">
                <strong>Site title:</strong> {this.state.data.seo?.title || "-"}
              </div>
              <div className="preview-item">
                <strong>Greeting:</strong> {this.state.data.greeting?.title || "-"}
              </div>
              <div className="preview-item">
                <strong>Subtitle:</strong> {this.state.data.greeting?.subTitle || "-"}
              </div>
              <div className="preview-item">
                <strong>First social link:</strong> {this.state.data.socialMediaLinks?.[0]?.name || "-"}
              </div>
            </div>
          </div>

          <div className="admin-section">
            <h3>Actions</h3>
            <div className="admin-buttons">
              <button
                className="admin-button"
                onClick={this.handleSave}
                style={{ backgroundColor: theme.primaryColor }}
              >
                Save Changes
              </button>
              <button
                className="admin-button"
                onClick={this.handleReset}
                style={{ backgroundColor: theme.secondaryColor }}
              >
                Reset to Default
              </button>
              <button
                className="admin-button admin-button-warning"
                onClick={() => {
                  if (window.confirm('Clear localStorage and reset?')) {
                    localStorage.removeItem('portfolioData');
                    const defaultData = getPortfolioData();
                    this.setState({ jsonText: JSON.stringify(defaultData, null, 2), data: defaultData });
                    alert('Reset complete. Refresh page for final result.');
                  }
                }}
              >
                Clear LocalStorage
              </button>
            </div>
            <div className="admin-hint">Aaj se jo bhi changes karoge, tab tak thik hain jab tak clear na karo.</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;