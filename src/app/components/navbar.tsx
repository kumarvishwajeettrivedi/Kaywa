'use client';
import styles from "./../cssmodule/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { User, Tag, X, History, Settings, LogOut, Coins } from 'lucide-react';
import { categories, CategoryData } from './tags';
import LoginScreen from "./login";
import HistoryScreen from "./history";
import TagsScreen from "./tagsdesktop";
import CreditScreen from "./credit";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isTagsBottomSheetOpen, setIsTagsBottomSheetOpen] = useState(false);
    const [isDesktopTagsOpen, setIsDesktopTagsOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
    const [isHistoryBottomSheetOpen, setIsHistoryBottomSheetOpen] = useState(false);
    const [isCreditOpen, setIsCreditOpen] = useState(false);

    const [isLoginOpen, setIsLoginOpen] = useState(false); // Move this to top
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Boolean states for login/signup status
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isSignedUp, setIsSignedUp] = useState(true);

    // Check if user is authenticated
    const isAuthenticated = isLoggedIn || isSignedUp;

    const handleProfileClick = () => {
        setIsBottomSheetOpen(true);
    };

    const handleTagsClick = () => {
        setIsTagsBottomSheetOpen(true);
    };
    const handleDesktopTagsClick = () => {
        setIsDesktopTagsOpen(true);
    };

    const handleDesktopProfileClick = () => {
        setIsDesktopDropdownOpen(!isDesktopDropdownOpen);
    };

    const handleCloseBottomSheet = () => {
        setIsBottomSheetOpen(false);
    };
    const handleHistoryClick = () => {
        setIsHistoryBottomSheetOpen(true);
    };

    const handleCreditClick = () => {
        setIsCreditOpen(true);
    };
    const handleCloseTagsBottomSheet = () => {
        setIsTagsBottomSheetOpen(false);
    };

    const handleOptionClick = (option: string) => {
        console.log(`Clicked: ${option}`);
        if (option === 'logout') {
            setIsBottomSheetOpen(false);
            setIsDesktopDropdownOpen(false);
            setIsLoggedIn(false);
            setIsSignedUp(false);
        } else if (option === 'history') {
            handleHistoryClick(); // Use the same handler for consistency
        }
    };

    const handleTagClick = (tag: string) => {
        console.log(`Tag clicked: ${tag}`);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDesktopDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);




    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.left}>
                    <Link href="/" className={styles.brand}>
                        <Image
                            src="/kaywalog.png"
                            alt="Kaiwa Logo"
                            width={120}
                            height={40}
                            priority
                        />
                    </Link>
                </div>

                {/* Conditional Rendering based on authentication status */}
                {isAuthenticated ? (
                    // Authenticated User Navigation
                    <>
                        {/* Desktop Navigation */}
                        <div className={styles.desktopNav}>
                            <div className={styles.buttonGroup}>
                            <div 
    className={styles.dropdownButton}
    onClick={() => {
        // Show loading screen or navigate
        window.location.href = '/loadingscreen';
    }}
>
    Country <span className={styles.chevron}> +</span>
</div>
                                <div className={styles.simpleButton}>Pro</div>
                                <div
                                    className={styles.dropdownButton}
                                    onClick={handleDesktopTagsClick}  // Add this
                                >
                                    Tags <span className={styles.chevron}> +</span>
                                </div>
                            </div>

                            <div className={styles.individualButtons}>
                                <div className={styles.individualButton} onClick={handleCreditClick}>
                                    Credits
                                </div>                                <div
                                    className={styles.individualButton}
                                    onClick={handleHistoryClick}  // Now this will work
                                >
                                    History
                                </div><div
                                    className={styles.circleButton}
                                    onClick={handleDesktopProfileClick}
                                    ref={dropdownRef}
                                >
                                    <User size={18} className={styles.profileIcon} />

                                    {/* Desktop Dropdown */}
                                    {isDesktopDropdownOpen && (
                                        <div className={styles.desktopDropdown}>
                                            <div className={styles.dropdownOptions}>
                                                <div
                                                    className={styles.dropdownItem}
                                                    onClick={() => handleOptionClick('setting')}
                                                >
                                                    <Settings size={16} />
                                                    <span>Setting</span>
                                                </div>
                                                <div className={styles.dropdownDivider}></div>
                                                <div
                                                    className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
                                                    onClick={() => handleOptionClick('logout')}
                                                >
                                                    <LogOut size={16} />
                                                    <span>Logout</span>
                                                </div>
                                            </div>
                                            <div className={styles.dropdownProfileInfo}>
                                                <div className={styles.dropdownProfileName}>Vishwajeet</div>
                                                <div className={styles.dropdownProfileDetails}>
                                                    India • Male
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={styles.mobileButtons}>
                            <div
                                className={styles.mobileTagButton}
                                role="button"
                                tabIndex={0}
                                onClick={handleTagsClick}
                            >
                                <Tag size={16} />
                                Tags
                            </div>
                            <div
                                className={styles.mobileProfileButton}
                                role="button"
                                tabIndex={0}
                                onClick={handleProfileClick}
                            >
                                <User size={16} className={styles.profileIcon} />
                            </div>
                        </div>
                    </>
                ) : (
                    // Non-authenticated User Navigation
                    <div className={styles.right}>
                        <button
                            className={styles.link}
                            onClick={() => setIsLoginOpen(true)}
                        >
                            Login
                        </button>
                    </div>
                )}
            </nav>

            {/* Profile Bottom Sheet Overlay */}
            {isBottomSheetOpen && (
                <div className={styles.bottomSheetOverlay} onClick={handleCloseBottomSheet}>
                    <div
                        className={styles.bottomSheetContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <div className={styles.bottomSheetHeader}>
                            <button
                                className={styles.closeButton}
                                onClick={handleCloseBottomSheet}
                            >
                                <X size={30} />
                            </button>
                        </div>

                        {/* Menu Options */}
                        <div className={styles.bottomSheetOptions}>
                            <div
                                className={styles.optionItem}
                                onClick={handleCreditClick}
                            >
                                <Coins size={20} />
                                <span>Credit</span>
                            </div>
                            <div
                                className={styles.optionItem}
                                onClick={() => handleOptionClick('history')}
                            >
                                <History size={20} />
                                <span>History</span>
                            </div>
                            <div
                                className={styles.optionItem}
                                onClick={() => handleOptionClick('setting')}
                            >
                                <Settings size={20} />
                                <span>Setting</span>
                            </div>
                            <div
                                className={`${styles.optionItem} ${styles.logoutOption}`}
                                onClick={() => handleOptionClick('logout')}
                            >
                                <LogOut size={20} />
                                <span>Logout</span>
                            </div>
                        </div>

                        {/* Profile Information */}
                        <div className={styles.profileInfo}>
                            <div className={styles.profileName}>Vishwajeet</div>
                            <div className={styles.profileDetails}>
                                India • Male
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tags Bottom Sheet Overlay */}
            {isTagsBottomSheetOpen && (
                <div className={styles.bottomSheetOverlay} onClick={handleCloseTagsBottomSheet}>
                    <div
                        className={styles.tagsBottomSheetContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <div className={styles.bottomSheetHeader}>
                            <button
                                className={styles.closeButton}
                                onClick={handleCloseTagsBottomSheet}
                            >
                                <X size={30} />
                            </button>
                        </div>

                        {/* Tags Content */}
                        <div className={styles.tagsContent}>
                            <div className={styles.tagsTitle}>All Tags</div>
                            <div className={styles.tagsContainer}>
                                {categories.map((category: CategoryData, index: number) => (
                                    <div key={index} className={styles.categorySection}>
                                        <div className={styles.categoryTitle}>{category.title}</div>
                                        <div className={styles.tagsGrid}>
                                            {category.items.map((tag: string, tagIndex: number) => (
                                                <div
                                                    key={tagIndex}
                                                    className={styles.tagChip}
                                                    onClick={() => handleTagClick(tag)}
                                                >
                                                    {tag}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* History Bottom Sheet */}
            <HistoryScreen
                isOpen={isHistoryBottomSheetOpen}
                onClose={() => setIsHistoryBottomSheetOpen(false)}
            />
            <TagsScreen
                isOpen={isDesktopTagsOpen}
                onClose={() => setIsDesktopTagsOpen(false)}
            />
            <CreditScreen
                isOpen={isCreditOpen}
                onClose={() => setIsCreditOpen(false)}
            />

            {/* Login Modal - THIS IS THE CORRECT PLACEMENT */}
            {isLoginOpen && (
                <LoginScreen
                    isOpen={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)}
                />
            )}
        </>
    );
}