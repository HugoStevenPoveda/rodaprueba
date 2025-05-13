import React, { useState, useEffect } from 'react';
import { Credit, CreditDetail } from '../types';
import { fetchAllCredits, fetchCreditDetail } from '../api/creditApi';
import CreditList from './CreditList';
import CreditDetailComponent from './CreditDetail';
import Header from './Header';

const Dashboard: React.FC = () => {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [selectedCreditId, setSelectedCreditId] = useState<number | null>(null);
  const [selectedCredit, setSelectedCredit] = useState<Credit | null>(null);
  const [creditDetail, setCreditDetail] = useState<CreditDetail | null>(null);
  const [isLoadingCredits, setIsLoadingCredits] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  // Fetch all credits on component mount
  useEffect(() => {
    const loadCredits = async () => {
      try {
        setIsLoadingCredits(true);
        const data = await fetchAllCredits();
        setCredits(data);
      } catch (error) {
        console.error('Error loading credits:', error);
      } finally {
        setIsLoadingCredits(false);
      }
    };

    loadCredits();
  }, []);

  // Fetch credit detail when a credit is selected
  useEffect(() => {
    const loadCreditDetail = async () => {
      if (!selectedCreditId) return;

      try {
        setIsLoadingDetail(true);

        // Find the selected credit from the list
        const credit = credits.find(c => c.credito_id === selectedCreditId);
        if (credit) {
          setSelectedCredit(credit);
        }

        // Fetch the credit detail
        const detail = await fetchCreditDetail(selectedCreditId);
        setCreditDetail(detail);
      } catch (error) {
        console.error(`Error loading credit detail for ID ${selectedCreditId}:`, error);
      } finally {
        setIsLoadingDetail(false);
      }
    };

    loadCreditDetail();
  }, [selectedCreditId, credits]);

  // Handle credit selection
  const handleSelectCredit = (creditId: number) => {
    setSelectedCreditId(creditId);
    // Scroll to top when selecting a credit
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle back button
  const handleBack = () => {
    setSelectedCreditId(null);
    setSelectedCredit(null);
    setCreditDetail(null);
  };

  return (
    <div className="min-h-screen bg-graydark-900 text-neon-yellow">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedCreditId && selectedCredit ? (
          <CreditDetailComponent
            credit={selectedCredit}
            creditDetail={creditDetail}
            isLoading={isLoadingDetail}
            onBack={handleBack}
          />
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neon-yellow">Créditos</h2>
              <p className="mt-2 text-base text-white">
                Gestione y visualice la información de todos los créditos.
              </p>
            </div>

            <CreditList
              credits={credits}
              isLoading={isLoadingCredits}
              onSelectCredit={handleSelectCredit}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;